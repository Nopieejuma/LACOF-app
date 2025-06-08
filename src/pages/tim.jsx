import { useEffect, useState } from "react"
import { timAPI } from "../services/timAPI" // pastikan ada API service untuk tim
import GenericTable from "../components/GenericTable"
import AlertBox from "../components/AlertBox"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Tim() {
  const [tim, setTim] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editId, setEditId] = useState(null)

  const [dataForm, setDataForm] = useState({
    nama: "",
    jabatan: "",
  })

  useEffect(() => {
    loadTim()
  }, [])

  const loadTim = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await timAPI.fetchTim()
      setTim(data)
    } catch (err) {
      console.error(err)
      setError("Gagal memuat data tim")
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
        await timAPI.updateTim(editId, dataForm)
        setSuccess("Data tim berhasil diperbarui")
      } else {
        await timAPI.create(dataForm)
        setSuccess("Data tim berhasil ditambahkan")
      }
      setDataForm({ nama: "", jabatan: "" })
      setEditId(null)
      loadTim()
    } catch (err) {
      console.error(err)
      setError("Gagal menyimpan data tim")
    }
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setDataForm({
      nama: item.nama,
      jabatan: item.jabatan,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data tim ini?")) return
    try {
      await timAPI.deleteTim(id)
      setSuccess("Data tim berhasil dihapus")
      loadTim()
    } catch (err) {
      console.error(err)
      setError("Gagal menghapus data tim")
    }
  }

  const columns = ["#", "Nama", "Jabatan", "Aksi"]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Tim</h2>

      {/* Form Tambah/Edit */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit Data Tim" : "Tambah Data Tim Baru"}
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

          <input
            type="text"
            name="jabatan"
            value={dataForm.jabatan}
            placeholder="Jabatan"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            {editId ? "Simpan Perubahan" : "Simpan Data Tim"}
          </button>
        </form>
      </div>

      {/* Tabel Daftar Tim */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Daftar Tim</h3>

        {loading ? (
          <LoadingSpinner text="Memuat data tim..." />
        ) : tim.length === 0 ? (
          <EmptyState text="Belum ada data tim" />
        ) : (
          <GenericTable
            columns={columns}
            data={tim}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{item.nama}</td>
                <td className="px-6 py-3">{item.jabatan}</td>
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
