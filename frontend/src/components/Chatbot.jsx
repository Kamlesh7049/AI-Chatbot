import React from 'react';
import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!query.trim()) {
      setError("Please enter a query.");
      return;
    }

    setLoading(true);
    setError(""); // Reset previous errors

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", { query });
      setResponse(res.data.answer);
    } catch (err) {
      setError("Error: " + (err.response?.data?.error || "Something went wrong"));
      console.error("Chatbot Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-xl font-bold">AI Chatbot</h2>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full p-2 border rounded"
      />
      <button onClick={handleSend} className="px-4 py-2 bg-blue-500 text-white rounded mt-2">
        {loading ? "Thinking..." : "Send"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {response && <p className="mt-4 bg-white p-2 rounded shadow">{response}</p>}
    </div>
  );
};

export default Chatbot;
