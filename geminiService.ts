
import { GoogleGenAI } from "@google/genai";
import { SearchResult } from "./types";

const MODEL_NAME = 'gemini-3-flash-preview';

export const getEvidenceData = async (query: string): Promise<SearchResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Provide TDM details for "${query}". Include: 
        1. Recommended sampling timing (Trough/Peak/Steady state).
        2. Specimen and tube requirements.
        3. Therapeutic and toxic ranges.
        4. Evidence-based references (citing IATDMCT if applicable).`,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.1, // Keep it factual
      },
    });

    const text = response.text || "No detailed information found.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        web: {
          title: chunk.web?.title || 'External Source',
          uri: chunk.web?.uri || ''
        }
      }))
      .filter((s: any) => s.web.uri) || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "Unable to fetch live evidence at this time. Please check your connection or try again later.",
      sources: []
    };
  }
};
