import { useEffect, useState } from "react"
import { testimoniAPI } from "../services/testimoniAPI" // pastikan ada API service testimoni
import GenericTable from "../components/GenericTable"
import AlertBox from "../components/AlertBox"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Testimoni() {
  const [testimoni, setTestimoni] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editId, setEditId] = useState(null)

  const [dataForm, setDataForm] = useState({
    nama: "",
    pesan: "",
    profesi: "",
  })

  useEffect(() => {
    loadTestimoni()
  }, [])

  const loadTestimoni = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await testimoniAPI.fetchTestimoni()
      setTestimoni(data)
    } catch (err) {
      console.error(err)
      setError("Gagal memuat data testimoni")
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
        await testimoniAPI.updateTestimoni(editId, dataForm)
        setSuccess("Testimoni berhasil diperbarui")
      } else {
        await testimoniAPI.create(dataForm)
        setSuccess("Testimoni berhasil ditambahkan")
      }
      setDataForm({ nama: "", pesan: "", profesi: "" })
      setEditId(null)
      loadTestimoni()
    } catch (err) {
      console.error("Error simpan testimoni:", err.response?.data || err.message || err)
      setError("Gagal menyimpan testimoni")
    }
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setDataForm({
      nama: item.nama,
      pesan: item.pesan,
      profesi: item.profesi || "",
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return
    try {
      await testimoniAPI.deleteTestimoni(id)
      setSuccess("Testimoni berhasil dihapus")
      loadTestimoni()
    } catch (err) {
      console.error("Error hapus testimoni:", err)
      setError("Gagal menghapus testimoni")
    }
  }

  const columns = ["#", "Nama", "Pesan","Profesi", "Aksi"]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Testimoni</h2>

      {/* Form Tambah/Edit */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit Testimoni" : "Tambah Testimoni Baru"}
        </h3>

        {success && <AlertBox type="success">{success}</AlertBox>}
        {error && <AlertBox type="error">{error}</AlertBox>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nama"
            value={dataForm.nama}
            placeholder="Nama"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            required
          />

          <textarea
            name="profesi"
            value={dataForm.profesi}
            placeholder="Profesi anda"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            rows={4}
            required
          />

          <textarea
            name="pesan"
            value={dataForm.pesan}
            placeholder="Pesan Testimoni"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            rows={4}
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            {editId ? "Simpan Perubahan" : "Simpan Testimoni"}
          </button>
        </form>
      </div>

      {/* Tabel Daftar Testimoni */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Daftar Testimoni</h3>

        {loading ? (
          <LoadingSpinner text="Memuat data testimoni..." />
        ) : testimoni.length === 0 ? (
          <EmptyState text="Belum ada data testimoni" />
        ) : (
          <GenericTable
            columns={columns}
            data={testimoni}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{item.nama}</td>
                <td className="px-6 py-3">{item.profesi}</td>
                <td className="px-6 py-3">{item.pesan}</td>
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
