import { NextRequest, NextResponse } from "next/server";

// In-memory 24-hour rate limit store (Use Redis/Upstash in multi-instance scale)
const rateLimitStore = new Map<string, number>();
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

function cleanupExpiredLimits() {
  const now = Date.now();
  for (const [key, timestamp] of rateLimitStore.entries()) {
    if (now - timestamp > TWENTY_FOUR_HOURS_MS) {
      rateLimitStore.delete(key);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    cleanupExpiredLimits();

    const { phoneNumber, niche } = await req.json();

    if (!phoneNumber || phoneNumber.trim().length < 8) {
      return NextResponse.json(
        { error: "Please enter a valid phone number with country code (e.g., +1 512 555 0199)." },
        { status: 400 }
      );
    }

    // Normalize phone & extract client IP
    const normalizedPhone = phoneNumber.replace(/[^\d+]/g, "");
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";

    const phoneKey = `phone:${normalizedPhone}`;
    const ipKey = `ip:${clientIp}`;
    const now = Date.now();

    // Check 24-hour Guardrail (1 call per phone number & max 2 per IP per 24h)
    const lastPhoneCall = rateLimitStore.get(phoneKey);
    if (lastPhoneCall && now - lastPhoneCall < TWENTY_FOUR_HOURS_MS) {
      return NextResponse.json(
        {
          error:
            "Rate limit reached: Maximum 1 live demo call per phone number every 24 hours. Start your 7-Day Free Pilot for unlimited testing."
        },
        { status: 429 }
      );
    }

    const lastIpCall = rateLimitStore.get(ipKey);
    if (lastIpCall && now - lastIpCall < TWENTY_FOUR_HOURS_MS && clientIp !== "unknown-ip") {
      return NextResponse.json(
        {
          error:
            "Daily demo limit reached from this network. Create a free pilot account to run unlimited test calls."
        },
        { status: 429 }
      );
    }

    // Record timestamp before dispatching call
    rateLimitStore.set(phoneKey, now);
    if (clientIp !== "unknown-ip") {
      rateLimitStore.set(ipKey, now);
    }

    const selectedNiche = niche || "dental";
    const scripts: Record<string, string> = {
      dental:
        "Hello! This is Aria, your Zyntax AI Dental Receptionist. I saw you requested a live demo. In a real clinic, I answer missed calls in under half a second, check emergency tooth pain urgency, and book directly into Dentrix or Google Calendar. Thanks for testing Zyntax AI!",
      realestate:
        "Hi there! This is Marcus from Zyntax AI Real Estate Desk. When a buyer calls about a listing and your team is busy, I qualify their pre-approval status and lock in property tours automatically. Thanks for testing Zyntax AI!",
      consulting:
        "Welcome! This is Nova from Zyntax AI Advisory Reception. I qualify inbound B2B leads, answer retainer questions, and book discovery calls straight onto your calendar. Thanks for testing Zyntax AI!"
    };

    const spokenText = scripts[selectedNiche] || scripts.dental;

    // Real Twilio Outbound Call (Triggers when TWILIO env vars are set in Vercel)
    if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_PHONE_NUMBER
    ) {
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Calls.json`;
      const twiml = `<Response><Say voice="Polly.Joanna-Neural">${spokenText}</Say><Pause length="1"/><Say voice="Polly.Joanna-Neural">Check your SMS for your pilot setup link. Goodbye!</Say></Response>`;

      const res = await fetch(twilioUrl, {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          To: normalizedPhone,
          From: process.env.TWILIO_PHONE_NUMBER,
          Twiml: twiml
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        // Rollback rate limit if Twilio rejected the number format
        rateLimitStore.delete(phoneKey);
        return NextResponse.json(
          { error: errData.message || "Twilio could not dial this number. Include country code (e.g. +1)." },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        mode: "live_twilio",
        message: `Live 45-second AI call initiated to ${normalizedPhone}. Pick up your phone now!`
      });
    }

    // Staging fallback when Twilio keys are not configured yet
    return NextResponse.json({
      success: true,
      mode: "simulation",
      message: `Demo call queued for ${normalizedPhone} (${selectedNiche} agent). Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN & TWILIO_PHONE_NUMBER in Vercel to dial real phones.`
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process demo call request." },
      { status: 500 }
    );
  }
}
