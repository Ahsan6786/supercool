import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, from, to, subject, html } = body;

    // Verify Admin Credentials
    const expectedEmail = process.env.ADMIN_EMAIL;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!email || !password || email !== expectedEmail || password !== expectedPassword) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access: Invalid admin credentials." },
        { status: 401 }
      );
    }

    // Input Validation
    if (!to || !Array.isArray(to) || to.length === 0 || !subject || !html) {
      return NextResponse.json(
        { success: false, error: "Bad Request: Missing required email parameters." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL || "SuperCool AC Services <info@supercoolalhasa.shop>";
    const replyToEmail = process.env.REPLY_TO_EMAIL || "supercoolalhasa.acservices@gmail.com";

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Server Configuration Error: Resend API key is not configured." },
        { status: 500 }
      );
    }

    const results = [];
    let sentCount = 0;
    let failedCount = 0;

    // Process email sending sequentially for tracking
    for (const recipient of to) {
      const emailAddress = recipient.trim();
      if (!emailAddress) continue;

      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: senderEmail,
            reply_to: replyToEmail,
            to: [emailAddress],
            subject: subject,
            html: html,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          sentCount++;
          results.push({
            email: emailAddress,
            status: "success",
            id: data.id,
          });
        } else {
          failedCount++;
          results.push({
            email: emailAddress,
            status: "failed",
            error: data.message || `Resend API Error (HTTP ${res.status})`,
          });
        }
      } catch (err) {
        failedCount++;
        results.push({
          email: emailAddress,
          status: "failed",
          error: err.message || "Network request failed to Resend API",
        });
      }
    }

    return NextResponse.json({
      success: true,
      sentCount,
      failedCount,
      results,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
