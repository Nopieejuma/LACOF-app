import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkSearchFilIp() {
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

  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.title.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? framework.tags.includes(dataForm.selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(frameworkData.flatMap((framework) => framework.tags))];

  return (
    <div className="p-8 bg-green-100 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Framework List</h1>

      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search framework..."
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white"
          name="searchTerm"
          onChange={handleChange}
        />
        <select
          name="selectedTag"
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white"
          onChange={handleChange}
        >
          <option value="">All Tags</option>
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFrameworks.map((item) => (
          <div
            key={item.id}
            className="border p-6 rounded-lg shadow-md bg-white hover:shadow-2xl transition duration-300 transform hover:scale-105 hover:-translate-y-2"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h2>
            <p className="text-gray-700 font-medium">{item.title}</p>
            <p className="text-gray-600 mt-2 text-sm">{item.description}</p>

            <div className="mt-4 flex justify-between items-center">
              <span className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                {item.category}
              </span>
              <span className="text-green-600 font-bold text-lg">${item.price}</span>
            </div>

            <div className="mt-3 flex justify-between text-sm text-gray-500">
              <span>Discount: {item.discountPercentage}%</span>
              <span>⭐ {item.rating}</span>
            </div>

            <p className="mt-2 text-gray-700 text-sm">
              Stock: <span className="font-semibold">{item.stock} units</span>
            </p>

            <p className="text-gray-500 text-xs mt-2">
              Dimensions: {item.dimensions.width}x{item.dimensions.height}x{item.dimensions.depth} cm
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full"
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
