
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    // A real app would have more robust error handling or state management for this.
    // For this example, we log an error, and the UI will handle the disabled state.
    console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });


export const generateCaptionIdeas = async (imageDescription: string): Promise<string[] | null> => {
    if(!API_KEY) return null;

    try {
        const prompt = `Generate 3 short and engaging Instagram caption ideas for a photo of '${imageDescription}'. Each caption should be on a new line. Do not use markdown or numbering. Include a few relevant hashtags for each.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const text = response.text;
        return text.split('\n').filter(line => line.trim() !== '');

    } catch (error) {
        console.error("Error generating captions with Gemini:", error);
        return null;
    }
};
