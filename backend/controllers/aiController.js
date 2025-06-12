import 'dotenv/config' 
import { GoogleGenAI } from "@google/genai";
import { questionAnswerPrompt,  conceptExplainPrompt} from "../utils/prompts.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateInterviewQuestions(req, res) {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const model = "gemini-2.0-flash"; 

    const response = await ai.models.generateContentStream({
      model,
      contents,
    });

    let fullText = "";
    for await (const chunk of response) {
      fullText += chunk.text || "";
    }

    const cleaned = fullText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { raw: cleaned };
    }

    res.status(200).json(parsed);
  } catch (error) {
    console.error("ERROR in generateInterviewQuestions:", error);
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
}






export async function generateConceptExplanation(req, res){
    try{
        const {question} = req.body;
        if(!question){
            return res.status(400).json({message: "Missing required fields"});
        }
        
        const prompt = conceptExplainPrompt(question);
        
        const contents = [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ];
        
        const model = "gemini-2.0-flash";

        const response = await ai.models.generateContentStream({
          model,
          contents,
        });

        let fullText = "";
        for await (const chunk of response) {
          fullText += chunk.text || "";
        }

        const cleaned = fullText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
        
        let parsed;
        try {
          parsed = JSON.parse(cleaned);
        } catch {
          parsed = { raw: cleaned };
        }
        
        res.status(200).json(parsed);
    }
    catch(error){
        res.status(500).json({message: "Failed to generate explanation", error})
    }

}

