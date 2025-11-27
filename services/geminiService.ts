
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Language } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const getSystemInstruction = (lang: Language) => {
    let langInstruction = "Respond in English.";
    if (lang === 'hi') langInstruction = "Respond in Hindi (Devanagari script).";
    if (lang === 'es') langInstruction = "Respond in Spanish.";

    return `
You are FestPlan AI, an intelligent event planning assistant tailored for the Indian market and global audience.
Your goal is to help users plan weddings, festivals (Diwali, Holi, Navratri), and corporate events.
Key Characteristics:
1. Frugal-Friendly: Always suggest cost-effective solutions unless asked for luxury.
2. Culturally Aware: Understand nuances of Indian traditions, muhurats, and food preferences, but also respect Western holidays.
3. Sustainability Focused: Encourage eco-friendly choices (green weddings, zero waste).
4. Tone: Warm, celebratory, and professional.

IMPORTANT: ${langInstruction}
When giving advice, be concise and practical. Use bullet points for checklists.
`;
}

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string,
  language: Language = 'en'
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(language),
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    return result.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the festive network right now. Please try again.";
  }
};
