import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Pengeluaran() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("/data/pengeluaran.json")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => {
        console.error("Gagal ambil data:", err);
        setExpenses([]);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pengeluaran</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-amber-300">Tanggal</th>
            <th className="border border-gray-300 px-4 py-2 bg-amber-300">Kategori</th>
            <th className="border border-gray-300 px-4 py-2 bg-amber-300">Deskripsi</th>
            <th className="border border-gray-300 px-4 py-2 bg-amber-300 text-right">Jumlah (Rp)</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">Tidak ada data.</td>
            </tr>
          ) : (
            expenses.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="border border-gray-300 px-4 py-2 bg-amber-100">
                  <Link to={`/pengeluaran/${item.id}`}>{item.date}</Link>
                </td>
                <td className="border border-gray-300 px-4 py-2 bg-amber-100">
                  <Link to={`/pengeluaran/${item.id}`}>{item.category}</Link>
                </td>
                <td className="border border-gray-300 px-4 py-2 bg-amber-100">
                  <Link to={`/pengeluaran/${item.id}`}>{item.description}</Link>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right bg-red-100">
                  <Link to={`/pengeluaran/${item.id}`}>
                    {item.amount.toLocaleString("id-ID")}
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
