import { useEffect, useState } from "react"
import { artikelAPI } from "../services/artikelAPI"
import GenericTable from "../components/GenericTable"
import AlertBox from "../components/AlertBox"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Artikel() {
  const [artikel, setArtikel] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editId, setEditId] = useState(null)

  const [dataForm, setDataForm] = useState({
    judul: "",
    isi: "",
    gambar: "",
  })

  useEffect(() => {
    loadArtikel()
  }, [])

  const loadArtikel = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await artikelAPI.fetchArtikel()
      setArtikel(data)
    } catch (err) {
      console.error(err)
      setError("Gagal memuat data artikel")
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
        await artikelAPI.updateArtikel(editId, dataForm)
        setSuccess("Artikel berhasil diperbarui")
      } else {
        await artikelAPI.create(dataForm)
        setSuccess("Artikel berhasil ditambahkan")
      }
      setDataForm({ judul: "", isi: "", gambar: "" })
      setEditId(null)
      loadArtikel()
    } catch (err) {
      console.error("Error simpan artikel:", err.response?.data || err.message || err)
      setError("Gagal menyimpan artikel")
    }
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setDataForm({
      judul: item.judul,
      isi: item.isi,
      gambar: item.gambar,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return
    try {
      await artikelAPI.deleteArtikel(id)
      setSuccess("Artikel berhasil dihapus")
      loadArtikel()
    } catch (err) {
      console.error("Error hapus artikel:", err)
      setError("Gagal menghapus artikel")
    }
  }

  const columns = ["#", "Judul", "Gambar", "Aksi"]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Artikel</h2>

      {/* Form Tambah/Edit */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit Artikel" : "Tambah Artikel Baru"}
        </h3>

        {success && <AlertBox type="success">{success}</AlertBox>}
        {error && <AlertBox type="error">{error}</AlertBox>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="judul"
            value={dataForm.judul}
            placeholder="Judul Artikel"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            required
          />

          <textarea
            name="isi"
            value={dataForm.isi}
            placeholder="Isi Artikel"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            rows={5}
            required
          />

          <input
            type="text"
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
            {editId ? "Simpan Perubahan" : "Simpan Artikel"}
          </button>
        </form>
      </div>

      {/* Tabel Daftar Artikel */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Daftar Artikel</h3>

        {loading ? (
          <LoadingSpinner text="Memuat data artikel..." />
        ) : artikel.length === 0 ? (
          <EmptyState text="Belum ada data artikel" />
        ) : (
          <GenericTable
            columns={columns}
            data={artikel}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{item.judul}</td>
                <td className="px-6 py-3">
                  <img src={item.gambar} alt={item.judul} className="w-20 h-14 object-cover rounded" />
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
