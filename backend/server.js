import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js"
import { fileURLToPath } from "url";
import authRoutes from './routes/authRoutes.js'
import sessionRoutes from './routes/sessionRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import { protect } from "./middlewares/authMiddleware.js";
import { generateInterviewQuestions, generateConceptExplanation } from "./controllers/aiController.js";


const allowedOrigins = [
  "https://interview-prep-ai-heq4.vercel.app", 
];

const app = express(); 
app.use(
    cors({
        origin: "*",
        methods: ["GET", "PUT", "POST", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

connectDB()

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);





const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))