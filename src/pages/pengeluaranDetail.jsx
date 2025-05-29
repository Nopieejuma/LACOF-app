import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PengeluaranDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/pengeluaran.json")
      .then((res) => res.json())
      .then((list) => {
        const selected = list.find((item) => item.id === parseInt(id));
        setData(selected);
      })
      .catch((err) => console.error("Gagal ambil data:", err));
  }, [id]);

  if (!data) return <div className="p-6">Data tidak ditemukan.</div>;

  return (
    <div className="p-6 space-y-4">
      <Link to="/pengeluaran" className="text-blue-600 hover:underline">&larr; Kembali</Link>
      <h2 className="text-2xl font-bold">Detail Pengeluaran</h2>
      <p><strong>Tanggal:</strong> {data.date}</p>
      <p><strong>Kategori:</strong> {data.category}</p>
      <p><strong>Deskripsi:</strong> {data.description}</p>
      <p><strong>Jumlah:</strong> Rp {data.amount.toLocaleString("id-ID")}</p>
    </div>
  );
}
