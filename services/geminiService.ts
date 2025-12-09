import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const apiKey = process.env.API_KEY;

// Initialize the client once if the key exists
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const analyzeTweetContent = async (content: string): Promise<AnalysisResult> => {
  if (!ai) {
    console.warn("API Key missing, returning mock approval for dev mode");
    // Fallback for demo purposes if no key is provided, usually we'd throw error
    return {
      approved: true,
      score: 85,
      critique: "API Key missing. Mock approval.",
      improvedVersion: content
    };
  }

  const model = "gemini-2.5-flash";
  
  const systemInstruction = `
    You are the Chief Editor of 'Veritas', a high-quality microblogging platform. 
    Your job is to gatekeep content. 
    Content must be:
    1. Grammatically correct.
    2. Clear and concise.
    3. Free of hate speech, toxicity, or extreme vulgarity.
    4. Intellectually stimulating or entertaining (subjective, but prevent low-effort spam).
    
    If the content meets these standards (Score >= 80), approve it.
    If it has minor issues (Score 60-79), reject it but offer a fixed version.
    If it is garbage, spam, or toxic (Score < 60), reject it sternly.
    
    Return JSON only.
  `;

  const prompt = `Analyze this post draft: "${content}"`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            approved: { 
              type: Type.BOOLEAN,
              description: "Whether the post is high enough quality to be published." 
            },
            score: { 
              type: Type.INTEGER,
              description: "Quality score from 0 to 100." 
            },
            critique: { 
              type: Type.STRING,
              description: "A short explanation of why it passed or failed. Max 20 words." 
            },
            improvedVersion: { 
              type: Type.STRING,
              description: "An edited version of the content with better grammar/style. Required if score < 100." 
            }
          },
          required: ["approved", "score", "critique"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Empty response from AI");
    }

    const result = JSON.parse(jsonText) as AnalysisResult;
    return result;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    // Fail safe: don't let them post if AI is down/broken for safety in this strict app
    return {
      approved: false,
      score: 0,
      critique: "Unable to verify quality due to connection error. Please try again.",
    };
  }
};