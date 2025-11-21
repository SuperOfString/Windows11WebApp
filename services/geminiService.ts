import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

export const getChatResponseStream = async function* (message: string) {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    yield "Error: API_KEY environment variable is missing. Please configure it to use Copilot.";
    return;
  }

  try {
    if (!chatSession) {
      const ai = new GoogleGenAI({ apiKey });
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: "You are Windows Copilot, a helpful AI assistant integrated into a web-based Windows 11 simulation. Keep answers concise and helpful.",
        },
      });
    }

    const result = await chatSession.sendMessageStream({ message });
    
    for await (const chunk of result) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    yield `Error: ${error.message || "Failed to connect to Copilot."}`;
    // Reset session on error to allow retry
    chatSession = null;
  }
};
