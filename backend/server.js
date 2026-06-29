require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { GoogleGenAI } = require("@google/genai");

const User = require("./models/User");
const Question = require("./models/Question");

const app = express();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// Debug logs
app.use((req, res, next) => {
  console.log(`📩 ${req.method} ${req.url}`);
  next();
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5001,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Student Helpdesk Backend Running");
});

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔐 Login Attempt:", email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message:
          "Looks like you're new here 👋 We couldn't find an account with this email",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Ask Question Route (Stores Question)
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    const newQuestion = new Question({
      question,
    });

    await newQuestion.save();

    res.status(201).json({
      message: "Question submitted successfully",
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// AI Mentor Route
app.post("/ai-chat", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    const prompt = `
You are Student AI Mentor.

Instructions:
- Answer in ONLY 2 short sentences.
- Maximum 30 words.
- Keep the answer simple.
- Do NOT use bullet points.
- Do NOT give detailed explanations.
- Respond with only the answer.

Question:
${question}
`;

    const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
  config: {
    maxOutputTokens: 50,
    temperature: 0.2,
  },
});

console.log("Gemini Response:");
console.dir(response, { depth: null });

let answer = response.text?.trim() || "";

    // Keep only the first two sentences
    answer = answer
      .split(/(?<=[.!?])\s+/)
      .slice(0, 2)
      .join(" ");

    res.status(200).json({
      answer,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      message: "Failed to get AI response",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Started on Port ${PORT}`);
});