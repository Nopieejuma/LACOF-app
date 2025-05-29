import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Stok() {
  const [stok, setStok] = useState([]);

  useEffect(() => {
    fetch("/data/stok.json")
      .then((res) => res.json())
      .then((data) => setStok(data))
      .catch((err) => {
        console.error("Gagal ambil data stok bahan baku:", err);
        setStok([]);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Stok Bahan Baku</h2>

      {stok.length === 0 ? (
        <p className="text-gray-500">Stok habis.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {stok.map((item) => (
            <Link
              to={`/stok/${item.id}`}
              key={item.id}
              className="block p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-50 transition"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">{item.name}</h3>
                <span className="text-yellow-500">Jumlah: {item.stock}</span>
              </div>
              <p className="text-sm text-gray-700">{item.status}</p>
              <p className="text-xs text-gray-400 mt-2">Unit: {item.unit}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
