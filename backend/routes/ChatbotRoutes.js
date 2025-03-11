const express = require("express");
const { chatbotResponse } = require("../controllers/chatbotController");

const router = express.Router();

router.post("/", chatbotResponse);

module.exports = router;
