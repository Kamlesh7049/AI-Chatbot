require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const connectDB = require("./config/db"); // Import MongoDB connection

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB before running the server
connectDB();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chatbot", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    console.log("🔍 Sending query to OpenAI:", query);

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: query }],
    });

    console.log("✅ OpenAI Response:", aiResponse);

    if (!aiResponse.choices || aiResponse.choices.length === 0) {
      return res.status(500).json({ error: "Invalid AI response" });
    }

    res.json({ answer: aiResponse.choices[0].message.content });
  } catch (error) {
    console.error("❌ Chatbot API Error:", error);

    if (error.response) {
      console.error("⚠️ OpenAI API Error Response:", error.response.data);
      res.status(error.response.status).json({
        error: "Chatbot API Error",
        details: error.response.data,
      });
    } else {
      res.status(500).json({ error: "Chatbot Error", details: error.message });
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
