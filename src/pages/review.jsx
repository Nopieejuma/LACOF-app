import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch("/data/review.json")
        .then((res) => res.json())
        .then((data) => setReviews(data))
        .catch((error) => console.error("Gagal mengambil data review:", error));
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const filteredReviews = reviews.filter((review) =>
    review.customer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Ulasan Pelanggan</h2>

      <input
        type="text"
        placeholder="Cari nama pelanggan..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-md shadow-sm"
      />

      {filteredReviews.length === 0 ? (
        <p className="text-gray-500">Tidak ada ulasan yang cocok.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredReviews.map((review) => (
            <Link
              to={`/review/${review.id}`}
              key={review.id}
              className="block p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-50 transition"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">{review.customer}</h3>
                <span className="text-yellow-500">⭐ {review.rating}</span>
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-2">Tanggal: {review.date}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
