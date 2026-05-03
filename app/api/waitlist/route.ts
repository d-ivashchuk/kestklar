import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const loopsApiKey = process.env.LOOPS_API_KEY;

    if (!loopsApiKey) {
      // Dev mode: just log and return success
      console.log("LOOPS_API_KEY not set. Would have added:", email);
      return NextResponse.json({ success: true });
    }

    const res = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loopsApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source: "waitlist",
        subscribed: true,
        userGroup: "waitlist",
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Loops error:", error);
      return NextResponse.json(
        { error: "Failed to add to waitlist" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
