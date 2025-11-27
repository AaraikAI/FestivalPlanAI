import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini Client
// In a real production app, this key should be proxied or handled via a backend.
// For this demo, we assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are FestPlan AI, an intelligent event planning assistant tailored for the Indian market.
Your goal is to help users plan weddings, festivals (Diwali, Holi, Navratri), and corporate events.
Key Characteristics:
1. Frugal-Friendly: Always suggest cost-effective solutions unless asked for luxury.
2. Culturally Aware: Understand nuances of Indian traditions, muhurats, and food preferences.
3. Sustainability Focused: Encourage eco-friendly choices (green weddings, zero waste).
4. Tone: Warm, celebratory, and professional (Namaste!).

When giving advice, be concise and practical. Use bullet points for checklists.
`;

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  try {
    // We construct a chat history for context, though the simple generateContent
    // is stateless, we can prepend history for simple context simulation
    // or use the proper chat API. Here we use the Chat API.

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
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
