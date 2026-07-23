import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { db, saveLeadToFirestore } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

// Local JSON File Fallback Helpers
async function getLocalLeads() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveLocalLeads(leads) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save leads to file system:", error);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, mobileNumber, email, location, serviceType, contactMethod, consent, source } = body;

    // 1. Mandatory Field Validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "FullNameRequired", message: "Full name is required." },
        { status: 400 }
      );
    }

    if (!mobileNumber || typeof mobileNumber !== "string" || mobileNumber.trim().length < 7) {
      return NextResponse.json(
        { success: false, error: "MobileRequired", message: "A valid mobile number is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "EmailRequired", message: "A valid email address is required." },
        { status: 400 }
      );
    }

    const finalLocation = (location && typeof location === "string" && location.trim().length > 0) ? location.trim() : "Al Ahsa";

    if (!serviceType || typeof serviceType !== "string") {
      return NextResponse.json(
        { success: false, error: "ServiceRequired", message: "Service type selection is required." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, error: "ConsentRequired", message: "Customer consent is mandatory." },
        { status: 400 }
      );
    }

    const cleanMobile = mobileNumber.replace(/\D/g, "");
    const now = new Date();
    const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

    // 2. Duplicate Check (within last 24h)
    let isDuplicate = false;

    // A. Check Firebase Firestore
    try {
      const q = query(
        collection(db, "leads"),
        where("cleanMobile", "==", cleanMobile)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const leadData = doc.data();
        const leadTime = new Date(leadData.consentTimestamp || leadData.createdAt).getTime();
        if (now.getTime() - leadTime < TWENTY_FOUR_HOURS_MS) {
          isDuplicate = true;
        }
      });
    } catch (firebaseErr) {
      // Ignore rule error on check
    }

    // B. Check local file system fallback
    const localLeads = await getLocalLeads();
    if (!isDuplicate) {
      isDuplicate = localLeads.some((lead) => {
        const leadMobile = (lead.mobileNumber || "").replace(/\D/g, "");
        const leadTime = new Date(lead.consentTimestamp || lead.createdAt).getTime();
        return leadMobile === cleanMobile && now.getTime() - leadTime < TWENTY_FOUR_HOURS_MS;
      });
    }

    if (isDuplicate) {
      return NextResponse.json(
        {
          success: false,
          error: "DuplicateSubmission",
          message: "A request with this mobile number was already submitted recently.",
        },
        { status: 409 }
      );
    }

    // 3. Create Production Lead Object
    const leadRecord = {
      fullName: fullName.trim(),
      mobileNumber: mobileNumber.trim(),
      cleanMobile,
      email: email.trim(),
      location: finalLocation,
      serviceType: serviceType.trim(),
      contactMethod: contactMethod || "WhatsApp",
      consent: true,
      consentStatement:
        "I agree to receive WhatsApp and Email service updates, maintenance reminders, warranty records, and promotional offers from SuperCool.",
      consentTimestamp: now.toISOString(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      source: source || "Hero Lead Capture Form",
      status: "NEW",
    };

    // 4. Save to Firebase Firestore Database
    const firestoreResult = await saveLeadToFirestore(leadRecord);

    // 5. Save to local JSON store as backup
    const finalRecord = {
      id: firestoreResult.docId || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...leadRecord,
    };
    localLeads.unshift(finalRecord);
    await saveLocalLeads(localLeads);

    // 6. Return Response
    return NextResponse.json(
      {
        success: true,
        message: firestoreResult.success
          ? "Lead & Consent stored successfully in Firebase Database"
          : "Lead stored locally. Note: Firebase Security Rules require publishing.",
        firebaseSaved: firestoreResult.success,
        lead: {
          id: finalRecord.id,
          fullName: finalRecord.fullName,
          mobileNumber: finalRecord.mobileNumber,
          email: finalRecord.email,
          location: finalRecord.location,
          serviceType: finalRecord.serviceType,
          contactMethod: finalRecord.contactMethod,
          consentTimestamp: finalRecord.consentTimestamp,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error processing lead capture:", err);
    return NextResponse.json(
      { success: false, error: "InternalError", message: "Failed to process lead capture request." },
      { status: 500 }
    );
  }
}

// GET Endpoint to fetch leads for Admin Dashboard or CRM integration
export async function GET() {
  try {
    let leads = [];

    // Fetch from Firebase Firestore
    try {
      const q = query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(200));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        leads.push({ id: doc.id, ...doc.data() });
      });
    } catch (firebaseErr) {
      console.warn("Firestore fetch error, falling back to local store:", firebaseErr.message);
      leads = await getLocalLeads();
    }

    if (leads.length === 0) {
      leads = await getLocalLeads();
    }

    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch (err) {
    console.error("Error fetching leads:", err);
    return NextResponse.json(
      { success: false, error: "InternalError", message: "Failed to fetch leads." },
      { status: 500 }
    );
  }
}
