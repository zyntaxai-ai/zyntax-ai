import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, niche } = await req.json();

    if (!phoneNumber || phoneNumber.trim().length < 7) {
      return NextResponse.json(
        { error: "Please enter a valid phone number with country code." },
        { status: 400 }
      );
    }

    // Real Twilio Outbound Call Trigger (activates automatically when env vars are set)
    if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_PHONE_NUMBER
    ) {
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Calls.json`;
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://zyntaxhq.com";

      const res = await fetch(twilioUrl, {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: phoneNumber,
          From: process.env.TWILIO_PHONE_NUMBER,
          Url: `${appUrl}/api/telephony/inbound?niche=${encodeURIComponent(
            niche || "dental"
          )}`,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        return NextResponse.json(
          { error: errData.message || "Twilio call dispatch failed" },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        mode: "live_twilio",
        message: `Live AI call initiated to ${phoneNumber}`,
      });
    }

    // Interactive Staging Simulation when Twilio trial keys are not yet added
    return NextResponse.json({
      success: true,
      mode: "simulation",
      message: `Demo call queued for ${phoneNumber} (${niche} agent)`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to initiate demo call." },
      { status: 500 }
    );
  }
}
