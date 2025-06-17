import { useState } from "react";
import { FaFilter } from "react-icons/fa";

const data = [{ name: "Kopi", status: "Tersedia", date: "14 Mar 25" },
  { name: "Red velvet", status: "Habis", date: "1 Jun 25" },
  { name: "Matcha", status: "Tersedia", date: "5 Jun 25" },
  { name: "Americano", status: "Habis", date: "1 Jun 24" },
  { name: "Espresso", status: "Tersedia", date: "1 Jun 25" },
  { name: "Machiato", status: "Tersedia", date: "1 Jun 25" },
  { name: "Latte", status: "Habis", date: "12 Mei 25" },
  { name: "Cappuccino", status: "Tersedia", date: "10 Jun 25" },
  { name: "Affogato", status: "Habis", date: "7 Jun 25" },
  { name: "Mocha", status: "Tersedia", date: "9 Jun 25" },
  { name: "Caramel Macchiato", status: "Tersedia", date: "8 Jun 25" },
  { name: "Vanilla Latte", status: "Habis", date: "3 Jun 25" },
  { name: "Flat White", status: "Tersedia", date: "6 Jun 25" },
  { name: "Cold Brew", status: "Habis", date: "5 Jun 25" },
  { name: "Iced Americano", status: "Tersedia", date: "4 Jun 25" },
  { name: "Hazelnut Latte", status: "Habis", date: "2 Jun 25" },
  { name: "Ristretto", status: "Tersedia", date: "1 Jun 25" },
  { name: "Dalgona Coffee", status: "Tersedia", date: "31 Mei 25" },
  { name: "Kopi Tubruk", status: "Tersedia", date: "30 Mei 25" },
  { name: "Kopi Susu Gula Aren", status: "Habis", date: "28 Mei 25" },
];

const statusColor = {
  Tersedia: "bg-green-100 text-green-800",
  Habis: "bg-red-100 text-red-800",
};

export default function ProductTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">All of product</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search product"
            className="border px-3 py-1 rounded-md text-sm focus:outline-none"
          />
          <button className="flex items-center gap-1 border px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100">
            <FaFilter /> Filter
          </button>
        </div>
      </div>

      <table className="w-full text-sm text-left">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-2 px-3 font-medium">Artist</th>
            <th className="py-2 px-3 font-medium">Status</th>
            <th className="py-2 px-3 font-medium">Waktu</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="py-2 px-3">{item.name}</td>
              <td className="py-2 px-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[item.status]}`}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-2 px-3">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-1 mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          className="px-3 py-1 hover:underline text-sm text-gray-500"
          disabled={currentPage === 1}
        >
          Previous page
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-7 h-7 rounded-full text-sm ${
              currentPage === i + 1
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          className="px-3 py-1 hover:underline text-sm text-gray-500"
          disabled={currentPage === totalPages}
        >
          Next page
        </button>
      </div>
    </div>
  );
}
