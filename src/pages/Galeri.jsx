import { useEffect, useState } from "react"
import { galeriAPI } from "../services/galeriAPI"
import GenericTable from "../components/GenericTable"
import AlertBox from "../components/AlertBox"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Galeri() {
  const [galeri, setGaleri] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editId, setEditId] = useState(null)

  const [dataForm, setDataForm] = useState({
    gambar: "",
  })

  useEffect(() => {
    loadGaleri()
  }, [])

  const loadGaleri = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await galeriAPI.fetchGaleri()
      setGaleri(data)
    } catch (err) {
      console.error(err)
      setError("Gagal memuat data galeri")
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
        await galeriAPI.updateGaleri(editId, dataForm)
        setSuccess("Gambar galeri berhasil diperbarui")
      } else {
        await galeriAPI.create(dataForm)
        setSuccess("Gambar galeri berhasil ditambahkan")
      }
      setDataForm({ gambar: "" })
      setEditId(null)
      loadGaleri()
    } catch (err) {
      console.error("Error simpan galeri:", err.response?.data || err.message || err)
      setError("Gagal menyimpan galeri")
    }
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setDataForm({
      gambar: item.gambar,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus gambar ini?")) return
    try {
      await galeriAPI.deleteGaleri(id)
      setSuccess("Gambar berhasil dihapus")
      loadGaleri()
    } catch (err) {
      console.error("Error hapus galeri:", err)
      setError("Gagal menghapus galeri")
    }
  }

  const columns = ["#", "Preview", "Aksi"]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Galeri</h2>

      {/* Form Tambah/Edit */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit Gambar Galeri" : "Tambah Gambar Galeri"}
        </h3>

        {success && <AlertBox type="success">{success}</AlertBox>}
        {error && <AlertBox type="error">{error}</AlertBox>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="url"
            name="gambar"
            value={dataForm.gambar}
            placeholder="URL Gambar"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            {editId ? "Simpan Perubahan" : "Simpan Gambar"}
          </button>
        </form>
      </div>

      {/* Tabel Galeri */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Daftar Galeri</h3>

        {loading ? (
          <LoadingSpinner text="Memuat galeri..." />
        ) : galeri.length === 0 ? (
          <EmptyState text="Belum ada gambar galeri" />
        ) : (
          <GenericTable
            columns={columns}
            data={galeri}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">
                  <img src={item.gambar} alt={`Galeri ${index + 1}`} className="w-32 h-20 object-cover rounded" />
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
