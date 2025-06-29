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
    gambar: "", // Pastikan state gambar di-reset
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
    setLoading(true) // Set loading saat submit
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
      // Reset form setelah berhasil
      setDataForm({ nama: "", jabatan: "", gambar: "" })
      setEditId(null)
      await loadTim() // Muat ulang data
    } catch (err) {
      console.error(err)
      setError("Gagal menyimpan data tim")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setDataForm({
      nama: item.nama,
      jabatan: item.jabatan,
      gambar: item.gambar,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data tim ini?")) return
    try {
      setLoading(true)
      await timAPI.deleteTim(id)
      setSuccess("Data tim berhasil dihapus")
      await loadTim()
    } catch (err) {
      console.error(err)
      setError("Gagal menghapus data tim")
    } finally {
      setLoading(false)
    }
  }

  // Tambahkan "Foto" ke dalam kolom
  const columns = ["#", "Nama", "Jabatan", "Foto", "Aksi"]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Tim</h2>

      {/* Form Tambah/Edit */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit Data Tim" : "Tambah Data Tim Baru"}
        </h3>

        {success && <AlertBox type="success" onClose={() => setSuccess("")}>{success}</AlertBox>}
        {error && <AlertBox type="error" onClose={() => setError("")}>{error}</AlertBox>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nama"
            value={dataForm.nama}
            placeholder="Nama"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            required
          />

          <input
            type="text"
            name="jabatan"
            value={dataForm.jabatan}
            placeholder="Jabatan"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            required
          />

         <input
            type="url" // Ganti type menjadi 'url' untuk validasi dasar
            name="gambar"
            value={dataForm.gambar}
            placeholder="URL Gambar (contoh: https://...)"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading} // Disable tombol saat loading
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition disabled:bg-emerald-300"
          >
            {loading ? (editId ? "Menyimpan..." : "Menambahkan...") : (editId ? "Simpan Perubahan" : "Simpan Data Tim")}
          </button>
        </form>
      </div>

      {/* Tabel Daftar Tim */}
      <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Daftar Tim</h3>

        {loading && tim.length === 0 ? (
          <LoadingSpinner text="Memuat data tim..." />
        ) : tim.length === 0 && !error ? (
          <EmptyState text="Belum ada data tim" />
        ) : (
          <GenericTable
            columns={columns}
            data={tim}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-4 whitespace-nowrap align-middle">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap align-middle font-medium text-gray-900">{item.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap align-middle text-gray-600">{item.jabatan}</td>
                <td className="px-6 py-4">
                  {item.gambar ? (
                    <img 
                      src={item.gambar} 
                      alt={`Foto ${item.nama}`} 
                      className="w-16 h-16 object-cover rounded-md"
                      // Tambahan: handle jika gambar error
                      onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150?text=Error"; }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                      No Img
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap align-middle space-x-4">
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