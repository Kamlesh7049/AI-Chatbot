const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userQuery: String,
  botResponse: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatHistory", chatSchema);
