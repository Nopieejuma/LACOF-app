import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function StokDetail() {
  const { id } = useParams();
  const [stok, setStok] = useState(null);

  useEffect(() => {
    fetch("/data/stok.json")
      .then((res) => res.json())
      .then((data) => {
        const item = data.find((bahan) => bahan.id === parseInt(id));
        setStok(item);
      })
      .catch((err) => console.error("Gagal ambil detail stok:", err));
  }, [id]);

  if (!stok) {
    return <p className="p-6">Data stok tidak ditemukan.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <Link to="/stok" className="text-blue-600 hover:underline">&larr; Kembali</Link>
      <h2 className="text-2xl font-bold">{stok.name}</h2>
      <p className="text-yellow-500">Jumlah: {stok.stock}</p>
      <p className="text-gray-700">Status: {stok.status}</p>
      <p className="text-sm text-gray-500">Unit: {stok.unit}</p>
    </div>
  );
}
