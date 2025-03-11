import React from "react";
import Chatbot from "../components/Chatbot";
import FAQ from "../components/FAQ";

const HelpSupport = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Help & Support</h1>
      <div className="w-full max-w-2xl">
        <Chatbot />
        <FAQ />
      </div>
    </div>
  );
};

export default HelpSupport;
