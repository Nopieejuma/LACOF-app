import { useEffect, useState } from "react"
import { productAPI } from "../services/productAPI" // pastikan ada API service product
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
    try {
      if (editId) {
        await productAPI.updateProduk(editId, {
          ...dataForm,
          harga: parseInt(dataForm.harga),
          rating: parseInt(dataForm.rating),
        })
        setSuccess("Produk berhasil diperbarui")
      } else {
        await productAPI.create({
          ...dataForm,
          harga: parseInt(dataForm.harga),
          rating: parseInt(dataForm.rating),
        })
        setSuccess("Produk berhasil ditambahkan")
      }
      setDataForm({ nama: "", deskripsi: "", harga: "", rating: "" })
      setEditId(null)
      loadProduk()
    } catch (err) {
      console.error("Error simpan produk:", err.response?.data || err.message || err)
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

  const columns = ["#", "Nama", "Deskripsi", "Harga", "Rating", "Aksi"]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Produk</h2>

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
            type="number"
            name="harga"
            value={dataForm.harga}
            placeholder="Harga (Rp)"
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
                <td className="px-6 py-3">Rp {item.harga.toLocaleString()}</td>
                <td className="px-6 py-3">{item.rating}</td>
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
