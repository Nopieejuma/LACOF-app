import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ReviewDetail() {
  const { id } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    fetch("/data/review.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setReview(found);
      })
      .catch((error) => console.error("Gagal memuat detail review:", error));
  }, [id]);

  if (!review) {
    return <p className="p-6">Review tidak ditemukan.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <Link to="/review" className="text-blue-600 hover:underline">&larr; Kembali</Link>
      <h2 className="text-2xl font-bold">{review.customer}</h2>
      <p className="text-yellow-500">⭐ {review.rating}</p>
      <p className="text-gray-700">{review.comment}</p>
      <p className="text-sm text-gray-400">Tanggal: {review.date}</p>
    </div>
  );
}
