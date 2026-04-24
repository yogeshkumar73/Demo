
import { GoogleGenAI } from "@google/genai";

// Fix: Initializing strictly according to guidelines using direct process.env.API_KEY reference
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMarketInsights = async (symbols: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a brief, 3-sentence professional market analysis for the following symbols: ${symbols.join(', ')}. Focus on general sentiment.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Market insights currently unavailable. Please check back later.";
  }
};
