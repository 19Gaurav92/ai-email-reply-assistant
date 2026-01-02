import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const { email, tone } = await req.json();

  const systemPrompt = `
You are a senior account manager at a professional digital agency.

Rules:
- Sound human, not AI
- No emojis
- No filler phrases
- Confident and concise
- Under 120 words
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Incoming email:\n${email}\n\nTone:${tone}\n\nWrite a reply ready to send.`
      }
    ]
  });

  return NextResponse.json({
    reply: response.choices[0].message.content
  });
}
