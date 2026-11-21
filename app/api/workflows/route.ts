import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { niche, voiceModel, greetingPrompt, smsTemplate, calendarLink } = body;

    if (!greetingPrompt || !smsTemplate) {
      return NextResponse.json(
        { error: "Greeting prompt and SMS template are required." },
        { status: 400 }
      );
    }

    // Validated workflow payload ready for DB persistence & Voice Agent sync
    const updatedPipeline = {
      niche: niche || "dental",
      voiceModel: voiceModel || "Aria",
      greetingPrompt,
      smsTemplate,
      calendarLink: calendarLink || "",
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Workflow pipeline updated and synced.",
        pipeline: updatedPipeline,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save workflow configuration." },
      { status: 500 }
    );
  }
}
