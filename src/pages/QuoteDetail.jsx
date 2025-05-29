import React from "react";

const QuoteDetail = ({ quote, onClose }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-xl mx-auto mt-6 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl font-bold"
        aria-label="Close detail"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4 text-[#3e2d24]">Detail Quote</h2>
      <blockquote className="italic text-gray-700">"{quote}"</blockquote>
    </div>
  );
};

export default QuoteDetail;