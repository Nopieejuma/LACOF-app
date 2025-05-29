import React, { useEffect, useState } from "react";
import axios from "axios";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.quotable.io/random");
      setQuote(`${response.data.content} - ${response.data.author}`);
    } catch (error) {
      setQuote("Gagal memuat quote inspiratif.");
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold text-[#6b4c3b] mb-1">Quote Inspiratif</h3>

      {loading ? (
        <p>Memuat quote...</p>
      ) : (
        <blockquote
          onClick={() => setModalOpen(true)}
          className="italic text-gray-700 cursor-pointer hover:text-[#6b4c3b] transition"
          title="Klik untuk lihat detail quote"
        >
          "{quote}"
        </blockquote>
      )}

      <button
        onClick={fetchQuote}
        className="mt-2 px-4 py-2 bg-[#6b4c3b] text-white rounded-lg hover:bg-[#543b2c] transition"
      >
        Dapatkan Quote Baru
      </button>

      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-xl font-semibold mb-4 text-[#6b4c3b]">Detail Quote</h4>
            <p className="italic text-gray-800 mb-6">"{quote}"</p>
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-[#6b4c3b] text-white rounded hover:bg-[#543b2c] transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quote;