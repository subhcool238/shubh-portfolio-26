import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { input, previousChatId } = await req.json();

  if (!input || typeof input !== "string") {
    return NextResponse.json({ error: "Missing `input` string" }, { status: 400 });
  }

  const r = await fetch("https://api.vapi.ai/chat", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assistantId: process.env.SYN_ASSISTANT_ID,
      input,
      ...(previousChatId ? { previousChatId } : {}),
    }),
  });

  const data = await r.json();
  return NextResponse.json(data, { status: r.status });
}
