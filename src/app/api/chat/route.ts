import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages, tourContext } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    // 🧠 System prompt
    let systemPrompt =
      "You are a friendly cultural guide for Waaliin Tours in Ethiopia. Keep answers short, warm, and helpful.";

    if (tourContext?.title) {
      systemPrompt += ` The user is viewing ${tourContext.title} in ${tourContext.location}.`;
    }

    // 🧠 Combine messages
    const chatHistory = messages
      .map((m: any) => `${m.role}: ${m.content}`)
      .join("\n");

    const finalPrompt = `${systemPrompt}\n\n${chatHistory}\nassistant:`;

    // ✅ CORRECT MODEL (works)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: finalPrompt,
    });

    return NextResponse.json({
      role: "assistant",
      content: response.text,
    });
  } catch (error: any) {
    console.error("🔥 GEMINI ERROR:", error);

    return NextResponse.json(
      {
        error: "Gemini failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
