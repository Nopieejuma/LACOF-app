import { useEffect, useState } from "react"
import { bookingAPI } from "../services/bookingAPI"
import GenericTable from "../components/GenericTable"
import AlertBox from "../components/AlertBox"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Booking() {
  const [reservasi, setReservasi] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editId, setEditId] = useState(null)

  const [dataForm, setDataForm] = useState({
    nama: "",
    email: "",
    pesan: "",
    tanggal: "",
  })

  useEffect(() => {
    loadBooking()
  }, [])

  const loadBooking = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await bookingAPI.fetchBooking()
      setReservasi(data)
    } catch (err) {
      console.error(err)
      setError("Gagal memuat data reservasi")
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
      const formattedDate = new Date(dataForm.tanggal).toISOString().split("T")[0]
      const payload = { ...dataForm, tanggal: formattedDate }

      if (editId) {
        await bookingAPI.updateBooking(editId, payload)
        setSuccess("Reservasi berhasil diperbarui")
      } else {
        await bookingAPI.create(payload)
        setSuccess("Reservasi berhasil ditambahkan")
      }
      setDataForm({ nama: "", email: "", pesan: "", tanggal: "" })
      setEditId(null)
      loadBooking()
    } catch (err) {
      console.error("Error simpan reservasi:", err.response?.data || err.message || err)
      setError("Gagal menyimpan reservasi")
    }
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setDataForm({
      nama: item.nama,
      email: item.email,
      pesan: item.pesan,
      tanggal: item.tanggal,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus reservasi ini?")) return
    try {
      await bookingAPI.deleteBooking(id)
      setSuccess("Reservasi berhasil dihapus")
      loadBooking()
    } catch (err) {
      console.error("Error hapus reservasi:", err)
      setError("Gagal menghapus reservasi")
    }
  }

  const columns = ["#", "Nama", "Email", "Tanggal", "Aksi"]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Reservasi</h2>

      {/* Form Tambah/Edit */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit Reservasi" : "Tambah Reservasi Baru"}
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
            type="email"
            name="email"
            value={dataForm.email}
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            required
          />

          <textarea
            name="pesan"
            value={dataForm.pesan}
            placeholder="Pesan Tambahan"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            rows={3}
          />

          <input
            type="date"
            name="tanggal"
            value={dataForm.tanggal}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            {editId ? "Simpan Perubahan" : "Simpan Reservasi"}
          </button>
        </form>
      </div>

      {/* Tabel Daftar Reservasi */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Daftar Reservasi</h3>

        {loading ? (
          <LoadingSpinner text="Memuat data reservasi..." />
        ) : reservasi.length === 0 ? (
          <EmptyState text="Belum ada data reservasi" />
        ) : (
          <GenericTable
            columns={columns}
            data={reservasi}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{item.nama}</td>
                <td className="px-6 py-3">{item.email}</td>
                <td className="px-6 py-3">{item.pesan}</td>
                <td className="px-6 py-3">{item.tanggal}</td>
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
