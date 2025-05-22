import frameworkData from "./data.json";

export default function FrameworkListIp() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-amber-400 text-center mb-6">
        Menu Coffee Shop
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {frameworkData.map((item) => (
          <div
            key={item.id}
            className="border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300"
          >
            {/* Nama Menu */}
            <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
            <p className="text-gray-700 font-bold">{item.brand}</p> {/* Brand ditebalkan */}

            {/* Deskripsi */}
            <p className="text-gray-600 mt-2">{item.description}</p>

            {/* Kategori dan Harga */}
            <div className="mt-4 flex justify-between items-center">
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                {item.category}
              </span>
              <span className="text-green-600 font-bold text-lg">Rp{item.price.toLocaleString()}</span>
            </div>

            {/* Diskon dan Rating */}
            <div className="mt-3 flex justify-between text-sm text-gray-500">
              <span>Diskon: {item.discountPercentage}%</span>
              <span>⭐ {item.rating}</span>
            </div>

            {/* Stok */}
            <p className="mt-2 text-gray-700 text-sm">
              Stok: <span className="font-semibold">{item.stock} unit</span>
            </p>

            {/* Dimensi Produk */}
            <p className="text-gray-500 text-xs mt-2">
              Ukuran: {item.dimensions.width}x{item.dimensions.height}x{item.dimensions.depth} cm
            </p>

            {/* Tags */}
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
