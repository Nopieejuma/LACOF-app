import { useState } from "react";
import adminData from "./admin.json";

export default function AdminListSearchFilter() {
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

  const filteredAdmins = adminData.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(_searchTerm) ||
      admin.phone.toLowerCase().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? admin.tags.includes(dataForm.selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(adminData.flatMap((admin) => admin.tags)),
  ];

  return (
    <div className="p-8 bg-[#f9f5f0] min-h-screen">
      <input
        type="text"
        name="searchTerm"
        placeholder="Cari admin..."
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredAdmins.map((admin) => (
          <div
            key={admin.id}
            className="border border-[#a1887f] p-4 rounded-lg shadow-md bg-[#fff3e0]"
          >
            <h2 className="text-lg font-bold text-[#5d4037]">{admin.name}</h2>
            <p className="text-[#6d4c41]">WA: {admin.phone}</p>
            <p className="text-[#8d6e63]">Jam Operasional: {admin.operationalHours}</p>
            <div className="mt-2">
              {admin.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#efebe9] text-[#4e342e] px-2 py-1 text-xs rounded-full mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
