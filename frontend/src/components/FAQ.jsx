import React from "react";

const FAQ = () => {
  const faqs = [
    { question: "How do I reset my password?", answer: "Go to settings and click 'Reset Password'." },
    { question: "Where can I track my order?", answer: "Visit 'My Orders' in your dashboard." },
    { question: "How do I contact support?", answer: "You can email us at support@example.com." },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-300 py-2">
          <p className="font-medium text-gray-700">{faq.question}</p>
          <p className="text-gray-600">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
