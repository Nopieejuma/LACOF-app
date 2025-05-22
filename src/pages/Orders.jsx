import { useState } from "react";
import menuData from "./Orders.json";

export default function OrdersListSearchFilter() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
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

    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(menuData.flatMap((menu) => menu.tags)),
  ];

  return (
    <div className="p-8 bg-[#f9f5f0] min-h-screen">
      <input
        type="text"
        name="searchTerm"
        placeholder="Cari menu..."
        className="w-full p-2 border border-[#d2b48c] rounded mb-4 bg-[#fffaf3] text-[#4e342e]"
        onChange={handleChange}
      />

      <select
        name="selectedTag"
        className="w-full p-2 border border-[#d2b48c] rounded mb-4 bg-[#fffaf3] text-[#4e342e]"
        onChange={handleChange}
      >
        <option value="">Semua Tag</option>
        {allTags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <div className="space-y-6">
        {filteredOrders.map((menu) => (
          <div
            key={menu.id}
            className="flex items-center p-4 border border-[#a1887f] rounded-lg shadow-md bg-[#fff3e0]"
          >
            <img
              src={menu.image}
              alt={menu.title}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div>
              <h2 className="text-lg font-bold text-[#5d4037]">{menu.title}</h2>
              <p className="text-[#6d4c41]">Kategori: {menu.category}</p>
              <p className="text-green-700 font-semibold">
                Harga: Rp{menu.price.toLocaleString()}
              </p>
              <p className="text-[#8d6e63]">⭐ {menu.rating}</p>
              <div className="mt-2">
                {menu.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#efebe9] text-[#4e342e] px-2 py-1 text-xs rounded-full mr-2"
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
