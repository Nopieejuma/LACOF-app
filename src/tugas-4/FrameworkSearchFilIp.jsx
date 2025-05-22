import { useState } from "react";
import frameworkData from "./data.json";

export default function FrameworkSearchFilIp() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
    minRating: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();

  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.title.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? framework.tags.includes(dataForm.selectedTag)
      : true;

    const matchesRating = dataForm.minRating
      ? framework.rating >= parseFloat(dataForm.minRating)
      : true;

    return matchesSearch && matchesTag && matchesRating;
  });

  const allTags = [...new Set(frameworkData.flatMap((framework) => framework.tags))];

  return (
    <div className="p-8 bg-amber-200 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-8 text-amber-800">
        Daftar Menu Coffee Shop
      </h1>

      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari menu..."
          className="flex-1 p-3 border border-amber-800 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-300 focus:outline-none bg-white"
          name="searchTerm"
          onChange={handleChange}
        />

        <select
          name="selectedTag"
          className="p-3 border border-amber-800 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-300 focus:outline-none bg-white"
          onChange={handleChange}
        >
          <option value="">Semua Tag</option>
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <select
          name="minRating"
          value={dataForm.minRating}
          onChange={handleChange}
          className="p-3 border border-amber-800 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-300 focus:outline-none bg-white"
        >
          <option value="">Berdasarkan Rating</option>
          <option value="4.9">4.9 Stars</option>
          <option value="4.8">4.8 Stars</option>
          <option value="4.5">4.5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-amber-300 text-sm text-left text-gray-700 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-amber-300 text-amber-900 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Gambar</th>
              <th className="px-4 py-3">Judul</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Diskon</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Stok</th>
              <th className="px-4 py-3">Ukuran</th>
              <th className="px-4 py-3">Tag</th>
            </tr>
          </thead>
          <tbody>
            {filteredFrameworks.map((item) => (
              <tr
                key={item.id}
                className="border-t border-amber-300 hover:bg-amber-100 transition"
              >
                <td className="px-4 py-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-medium text-amber-800">
                  {item.title}
                </td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2 text-green-600 font-semibold">
                  Rp{item.price.toLocaleString()}
                </td>
                <td className="px-4 py-2">{item.discountPercentage}%</td>
                <td className="px-4 py-2">⭐ {item.rating}</td>
                <td className="px-4 py-2">{item.stock} unit</td>
                <td className="px-4 py-2 text-xs">
                  {item.dimensions.width}x{item.dimensions.height}x
                  {item.dimensions.depth} cm
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-300 text-gray-800 text-xs px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
