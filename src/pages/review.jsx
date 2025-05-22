import { useEffect, useState } from "react";

export default function Review() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/data/review.json")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => {
        console.error("Gagal ambil data review:", err);
        setReviews([]);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Ulasan Pelanggan</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">Belum ada ulasan.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map((review, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">{review.customer}</h3>
                <span className="text-yellow-500">⭐ {review.rating}</span>
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-2">Tanggal: {review.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
