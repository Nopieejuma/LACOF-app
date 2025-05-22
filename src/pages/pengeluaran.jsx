import React, { useState, useEffect } from "react";

export default function Pengeluaran() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Ganti dengan path file JSON kamu kalau beda
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
            <th className="border border-gray-300 px-4 py-2 text-left bg-amber-300">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left bg-amber-300">Category</th>
            <th className="border border-gray-300 px-4 py-2 text-left bg-amber-300">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-right bg-amber-300">Amount (Rp)</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No data available.
              </td>
            </tr>
          ) : (
            expenses.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 bg-amber-100">{item.date}</td>
                <td className="border border-gray-300 px-4 py-2 bg-amber-100">{item.category}</td>
                <td className="border border-gray-300 px-4 py-2 bg-amber-100">{item.description}</td>
                <td className="border border-gray-300 px-4 py-2 text-right bg-red-100">
                  {item.amount.toLocaleString("id-ID")}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
