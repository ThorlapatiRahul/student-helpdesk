const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful student mentor. Answer student questions clearly."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    res.json({
      answer: response.choices[0].message.content
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong"
    });
  }
});

module.exports = router;