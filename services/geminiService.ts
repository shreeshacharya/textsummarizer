
import { GoogleGenAI, Type } from "@google/genai";
import { SummaryResult } from "../types";

export const summarizeText = async (text: string): Promise<SummaryResult> => {
  if (!text.trim()) {
    throw new Error("Text content is required for summarization.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize the following text in clear and short points. 
               Be concise but ensure key information is preserved. 
               TEXT: ${text}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          points: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of concise summary points."
          }
        },
        required: ["points"]
      }
    }
  });

  const result = JSON.parse(response.text || '{"points": []}');
  
  // Calculate some stats
  const originalWords = text.trim().split(/\s+/).length;
  const summaryWords = result.points.join(' ').split(/\s+/).length;

  return {
    points: result.points,
    originalWordCount: originalWords,
    summaryWordCount: summaryWords
  };
};
