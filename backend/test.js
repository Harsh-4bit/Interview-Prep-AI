import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function run() {
  try {
    const model = 'gemini-2.0-flash'; // or gemini-1.5-pro
    const contents = [
      {
        role: 'user',
        parts: [{ text: 'Explain what is a linked list in simple terms.' }],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      contents,
    });

    for await (const chunk of response) {
      process.stdout.write(chunk.text || '');
    }
  } catch (error) {
    console.error('❌ ERROR:', error);
  }
}

run();
