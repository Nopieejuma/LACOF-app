import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ReportDetail() {
  const { filter, index } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    fetch("/data/report.json")
      .then((res) => res.json())
      .then((data) => {
        const selected = data[filter]?.[index];
        setDetail(selected || null);
      })
      .catch((err) => {
        console.error("Gagal ambil data detail:", err);
        setDetail(null);
      });
  }, [filter, index]);

  if (!detail) {
    return <p className="p-6 text-gray-500">Data tidak ditemukan.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Detail Laporan: {detail.label}</h2>
      <p className="text-lg">
        <strong>Total Pendapatan:</strong> Rp {detail.total.toLocaleString("id-ID")}
      </p>

      <Link
        to="/report"
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Kembali ke Laporan
      </Link>
    </div>
  );
}
