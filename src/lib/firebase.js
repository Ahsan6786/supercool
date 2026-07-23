import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDm5iGSCDAeY9iIvfOY3bOAMHaoxK8J09A",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "supercool-3c20a.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "supercool-3c20a",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "supercool-3c20a.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "211597332919",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:211597332919:web:eb5e1f382341b2a4ec9832",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-7BQ0QBWXTY"
};

// Initialize Firebase (prevent re-initialization on hot reloads)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Save lead record directly to Cloud Firestore (with REST API & Web SDK resilience)
 */
export async function saveLeadToFirestore(leadRecord) {
  const apiKey = firebaseConfig.apiKey;
  const projectId = firebaseConfig.projectId;
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/leads?key=${apiKey}`;

  // Method 1: Direct Firestore REST API
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          fullName: { stringValue: leadRecord.fullName || "" },
          mobileNumber: { stringValue: leadRecord.mobileNumber || "" },
          cleanMobile: { stringValue: leadRecord.cleanMobile || "" },
          email: { stringValue: leadRecord.email || "" },
          location: { stringValue: leadRecord.location || "" },
          serviceType: { stringValue: leadRecord.serviceType || "" },
          contactMethod: { stringValue: leadRecord.contactMethod || "WhatsApp" },
          consent: { booleanValue: Boolean(leadRecord.consent) },
          consentStatement: { stringValue: leadRecord.consentStatement || "" },
          consentTimestamp: { stringValue: leadRecord.consentTimestamp || new Date().toISOString() },
          createdAt: { stringValue: leadRecord.createdAt || new Date().toISOString() },
          updatedAt: { stringValue: leadRecord.updatedAt || new Date().toISOString() },
          source: { stringValue: leadRecord.source || "Hero Lead Capture Form" },
          status: { stringValue: leadRecord.status || "NEW" }
        }
      })
    });

    const data = await res.json();
    if (res.ok && data.name) {
      const docId = data.name.split("/").pop();
      console.log("🔥 Successfully stored lead in Firebase Firestore. Document ID:", docId);
      return { success: true, docId };
    } else if (data.error && data.error.status === "PERMISSION_DENIED") {
      console.error("❌ Firebase Firestore PERMISSION_DENIED: Rules in Firebase Console must allow read/write for collection 'leads'.");
      return { success: false, error: "PERMISSION_DENIED", message: data.error.message };
    }
  } catch (err) {
    console.error("Firestore REST API write error:", err);
  }

  // Method 2: Web SDK Fallback
  try {
    const docRef = await addDoc(collection(db, "leads"), leadRecord);
    console.log("🔥 Stored lead via Web SDK. Document ID:", docRef.id);
    return { success: true, docId: docRef.id };
  } catch (err) {
    console.error("Firestore Web SDK save error:", err.message);
    return { success: false, error: err.code || "UNKNOWN", message: err.message };
  }
}

export { app, db };
