import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Report() {
  const [reportData, setReportData] = useState([]);
  const [filter, setFilter] = useState("daily");

  useEffect(() => {
    fetch("/data/report.json")
      .then((res) => res.json())
      .then((data) => {
        setReportData(data[filter] || []);
      })
      .catch((err) => {
        console.error("Gagal ambil data:", err);
        setReportData([]);
      });
  }, [filter]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">
        Laporan Penjualan - {filter.charAt(0).toUpperCase() + filter.slice(1)}
      </h2>

      <div className="flex gap-2">
        {["daily", "weekly", "monthly"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${
              filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {f === "daily" ? "Harian" : f === "weekly" ? "Mingguan" : "Bulanan"}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b bg-amber-300">Label</th>
              <th className="p-3 border-b bg-amber-300">Total Pendapatan (Rp)</th>
            </tr>
          </thead>
          <tbody>
            {reportData.length === 0 ? (
              <tr>
                <td colSpan="2" className="p-3 text-center text-gray-500">
                  Tidak ada data.
                </td>
              </tr>
            ) : (
              reportData.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-100 cursor-pointer">
                  <td className="p-3 bg-amber-100">
                    <Link to={`/report/${filter}/${index}`} className="text-blue-600 hover:underline">
                      {item.label}
                    </Link>
                  </td>
                  <td className="p-3 bg-emerald-200">{item.total.toLocaleString("id-ID")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
