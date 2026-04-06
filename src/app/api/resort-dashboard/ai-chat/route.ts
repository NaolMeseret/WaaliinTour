import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// ✅ Helper: clean and format AI response
function formatResponse(text: string) {
  return text
    // Remove markdown symbols
    .replace(/###\s*/g, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`/g, "")

    // Convert sections into clean readable format
    .replace(/🔍 Analysis/g, "\n\nAnalysis:\n")
    .replace(/⚡ Action Plan/g, "\n\nAction Plan:\n")
    .replace(/💰 Business Impact/g, "\n\nBusiness Impact:\n")
    .replace(/⚠️ Improvements/g, "\n\nImprovements:\n")

    // Clean extra spaces/newlines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function POST(req: Request) {
  try {
    const {
      messages,
      recommendations,
      selectedRecommendation,
      hotelContext,
    } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    // 🧠 SYSTEM PROMPT (NO MARKDOWN OUTPUT)
    let systemPrompt = `
You are a senior hotel management consultant and strategic advisor.

Your role:
- Analyze recommendations deeply
- Provide practical business advice
- Be specific and actionable

IMPORTANT:
- DO NOT use markdown (no ###, **, *, bullets)
- Use plain text only
- Use this exact format:

Analysis:
(clear explanation)

Action Plan:
(step-by-step actions separated by new lines)

Business Impact:
(impact on revenue, guests, efficiency)

Improvements:
(additional ideas)

${hotelContext ? `
Hotel Context:
Type: ${hotelContext.type}
Location: ${hotelContext.location}
Guests: ${hotelContext.targetGuests?.join(", ")}
Facilities: ${hotelContext.facilities?.join(", ")}
Size: ${hotelContext.size}
` : ""}

${
  selectedRecommendation
    ? `Focus on this recommendation: "${selectedRecommendation.text}"`
    : `Recommendations:
${
  recommendations
    ? recommendations.map((rec: string, i: number) => `${i + 1}. ${rec}`).join("\n")
    : "None"
}`
}
`;

    const chatHistory = messages
      .map((m: any) => `${m.role}: ${m.content}`)
      .join("\n");

    const finalPrompt = `
${systemPrompt}

${chatHistory}

Give your final professional advice:
`;

    // 🚀 Gemini call
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: finalPrompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      },
    });

    // ✅ CLEAN OUTPUT HERE
    const cleanedText = formatResponse(response.text || "");

    return NextResponse.json({
      role: "assistant",
      content: cleanedText,
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