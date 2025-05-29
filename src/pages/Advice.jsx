import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Advice() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // state modal

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      setAdvice(response.data.slip.advice);
    } catch (error) {
      setAdvice("Gagal memuat advice.");
      console.error("Error fetching advice:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-[#6b4c3b] mb-2">Advice of the Day</h3>

      {loading ? (
        <p>Memuat advice...</p>
      ) : (
        // Advice clickable untuk buka modal
        <blockquote
          onClick={() => setModalOpen(true)}
          className="italic text-gray-700 mb-4 cursor-pointer hover:text-[#6b4c3b] transition"
          title="Klik untuk lihat detail advice"
        >
          "{advice}"
        </blockquote>
      )}

      <button
        onClick={fetchAdvice}
        className="mt-2 px-4 py-2 bg-[#6b4c3b] text-white rounded-lg hover:bg-[#543b2c] transition"
      >
        Dapatkan Advice Baru
      </button>

      {/* Modal Popup */}
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setModalOpen(false)} // klik area gelap modal = close
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md mx-4"
            onClick={(e) => e.stopPropagation()} // cegah close saat klik modal sendiri
          >
            <h4 className="text-xl font-semibold mb-4 text-[#6b4c3b]">Detail Advice</h4>
            <p className="italic text-gray-800 mb-6">"{advice}"</p>
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

