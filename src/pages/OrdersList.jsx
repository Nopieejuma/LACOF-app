import { useState } from "react";
import menuData from "./data.json";

export default function OrdersListSearchFilter() {
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

  const filteredOrders = menuData.filter((menu) => {
    const matchesSearch =
      menu.title.toLowerCase().includes(_searchTerm) ||
      menu.category.toLowerCase().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? menu.tags.includes(dataForm.selectedTag)
      : true;

    const matchesRating = dataForm.minRating
      ? menu.rating >= parseFloat(dataForm.minRating)
      : true;

    return matchesSearch && matchesTag && matchesRating;
  });

  const allTags = [...new Set(menuData.flatMap((menu) => menu.tags))];

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

      <div className="space-y-6">
        {filteredOrders.map((menu) => (
          <div
            key={menu.id}
            className="flex items-start bg-white border border-amber-300 p-4 rounded-lg shadow-lg space-x-4 hover:bg-amber-50 transition"
          >
            <img
              src={menu.image}
              alt={menu.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-amber-800">{menu.title}</h2>
              <p className="text-sm text-gray-700">{menu.category}</p>
              <p className="text-sm text-green-600 font-semibold">
                Rp{menu.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Rating: ⭐ {menu.rating} | Stok: {menu.stock} unit
              </p>
              <p className="text-sm text-gray-500">
                Ukuran: {menu.dimensions.width} x {menu.dimensions.height} x{" "}
                {menu.dimensions.depth} cm
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {menu.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-300 text-gray-800 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
