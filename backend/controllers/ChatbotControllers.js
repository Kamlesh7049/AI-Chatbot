const OpenAI = require("openai");
const ChatHistory = require("../models/ChatHistory");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const chatbotResponse = async (req, res) => {
  try {
    const { query } = req.body;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: query }],
    });

    const responseText = aiResponse.choices[0].message.content;

    // Save chat history to MongoDB
    await ChatHistory.create({ userQuery: query, botResponse: responseText });

    res.json({ answer: responseText });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { chatbotResponse };
