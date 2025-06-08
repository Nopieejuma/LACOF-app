import { useEffect, useState } from "react"
import { lokerAPI } from "../services/lokerAPI" // pastikan ada API service untuk loker
import GenericTable from "../components/GenericTable"
import AlertBox from "../components/AlertBox"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Loker() {
  const [loker, setLoker] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editId, setEditId] = useState(null)

  const [dataForm, setDataForm] = useState({
    posisi: "",
    kriteria: "",
  })

  useEffect(() => {
    loadLoker()
  }, [])

  const loadLoker = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await lokerAPI.fetchLoker()
      setLoker(data)
    } catch (err) {
      console.error(err)
      setError("Gagal memuat data lowongan kerja")
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
        await lokerAPI.updateLoker(editId, dataForm)
        setSuccess("Lowongan berhasil diperbarui")
      } else {
        await lokerAPI.create(dataForm)
        setSuccess("Lowongan berhasil ditambahkan")
      }
      setDataForm({ posisi: "", kriteria: "" })
      setEditId(null)
      loadLoker()
    } catch (err) {
      console.error(err)
      setError("Gagal menyimpan lowongan kerja")
    }
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setDataForm({
      posisi: item.posisi,
      kriteria: item.kriteria,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus lowongan ini?")) return
    try {
      await lokerAPI.deleteLoker(id)
      setSuccess("Lowongan berhasil dihapus")
      loadLoker()
    } catch (err) {
      console.error(err)
      setError("Gagal menghapus lowongan")
    }
  }

  const columns = ["#", "Posisi", "Kriteria", "Aksi"]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Lowongan Kerja</h2>

      {/* Form Tambah/Edit */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit Lowongan" : "Tambah Lowongan Baru"}
        </h3>

        {success && <AlertBox type="success">{success}</AlertBox>}
        {error && <AlertBox type="error">{error}</AlertBox>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="posisi"
            value={dataForm.posisi}
            placeholder="Posisi"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            required
          />

          <textarea
            name="kriteria"
            value={dataForm.kriteria}
            placeholder="Kriteria"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 resize-y"
            rows={4}
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            {editId ? "Simpan Perubahan" : "Simpan Lowongan"}
          </button>
        </form>
      </div>

      {/* Tabel Daftar Lowongan */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Daftar Lowongan</h3>

        {loading ? (
          <LoadingSpinner text="Memuat data lowongan..." />
        ) : loker.length === 0 ? (
          <EmptyState text="Belum ada data lowongan" />
        ) : (
          <GenericTable
            columns={columns}
            data={loker}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{item.posisi}</td>
                <td className="px-6 py-3">{item.kriteria}</td>
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
