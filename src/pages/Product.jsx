import { useEffect, useState } from "react"
import { productAPI } from "../services/productAPI"
import GenericTable from "../components/GenericTable"
import AlertBox from "../components/AlertBox"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Product() {
  const [produk, setProduk] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editId, setEditId] = useState(null)

  const [dataForm, setDataForm] = useState({
    nama: "",
    deskripsi: "",
    harga: "",
    rating: "",
    img: "",
  })

  useEffect(() => {
    loadProduk()
  }, [])

  const loadProduk = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await productAPI.fetchProduk()
      setProduk(data)
    } catch (err) {
      console.error(err)
      setError("Gagal memuat data produk")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setDataForm({ ...dataForm, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const hargaFix = parseInt(dataForm.harga.replace(/\./g, ""))
    const ratingFix = parseInt(dataForm.rating)

    if (isNaN(hargaFix) || isNaN(ratingFix)) {
      setError("Harga dan rating harus berupa angka yang valid.")
      return
    }

    try {
      if (editId) {
        await productAPI.updateProduk(editId, {
          ...dataForm,
          harga: hargaFix,
          rating: ratingFix,
        })
        setSuccess("Produk berhasil diperbarui")
      } else {
        await productAPI.create({
          ...dataForm,
          harga: hargaFix,
          rating: ratingFix,
        })
        setSuccess("Produk berhasil ditambahkan")
      }

      setDataForm({ nama: "", deskripsi: "", harga: "", rating: "", img: "" })
      setEditId(null)
      loadProduk()
    } catch (err) {
      console.error("Gagal simpan:", err.response?.data || err.message || err)
      setError("Gagal menyimpan produk")
    }
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setDataForm({
      nama: item.nama,
      deskripsi: item.deskripsi,
      harga: item.harga.toString(),
      rating: item.rating.toString(),
      img: item.img,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return
    try {
      await productAPI.deleteProduk(id)
      setSuccess("Produk berhasil dihapus")
      loadProduk()
    } catch (err) {
      console.error("Error hapus produk:", err)
      setError("Gagal menghapus produk")
    }
  }

  const columns = ["#", "Nama", "Deskripsi", "Harga", "Rating", "Gambar", "Aksi"]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Manajemen Produk
      </h2>

      {/* Form Tambah/Edit */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit Produk" : "Tambah Produk Baru"}
        </h3>

        {success && <AlertBox type="success">{success}</AlertBox>}
        {error && <AlertBox type="error">{error}</AlertBox>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nama"
            value={dataForm.nama}
            placeholder="Nama Produk"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            required
          />

          <textarea
            name="deskripsi"
            value={dataForm.deskripsi}
            placeholder="Deskripsi Produk"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            rows={3}
            required
          />

          <input
            type="text"
            name="harga"
            value={dataForm.harga}
            placeholder="Harga (contoh: 35000 atau 35.000)"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            required
          />

          <input
            type="number"
            name="rating"
            value={dataForm.rating}
            placeholder="Rating (1-5)"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            required
          />

          <input
            type="url"
            name="img"
            value={dataForm.img}
            placeholder="URL Gambar (contoh: https://...)"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            {editId ? "Simpan Perubahan" : "Simpan Produk"}
          </button>
        </form>
      </div>

      {/* Tabel Daftar Produk */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Daftar Produk</h3>

        {loading ? (
          <LoadingSpinner text="Memuat data produk..." />
        ) : produk.length === 0 ? (
          <EmptyState text="Belum ada data produk" />
        ) : (
          <GenericTable
            columns={columns}
            data={produk}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{item.nama}</td>
                <td className="px-6 py-3">{item.deskripsi}</td>
                <td className="px-6 py-3">
                  Rp {parseInt(item.harga).toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-3">{item.rating}</td>
                <td className="px-6 py-3">
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={item.nama}
                      className="w-20 h-20 object-cover rounded-lg shadow"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm text-red-600 hover:underline"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </button>
                </td>
              </>
            )}
          />
        )}
      </div>
    </div>
  )
}
