import adminData from "Admin.json";

export default function AdminList() {
  return (
    <div className="p-8">
      {adminData.map((admin) => (
        <div
          key={admin.id}
          className="border p-4 mb-4 rounded-lg shadow-md bg-white"
        >
          <h2 className="text-lg font-bold text-gray-800">{admin.name}</h2>
          <p className="text-gray-600">WA: {admin.phone}</p>
          <p className="text-gray-500">Jam Operasional: {admin.operationalHours}</p>
          <div className="mt-2">
            {admin.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full mr-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
