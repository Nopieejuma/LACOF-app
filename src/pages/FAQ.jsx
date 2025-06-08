import { useEffect, useState } from "react"
import { faqAPI } from "../services/faqAPI"
import GenericTable from "../components/GenericTable"
import AlertBox from "../components/AlertBox"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"

export default function FAQ() {
  const [faq, setFaq] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editId, setEditId] = useState(null)

  const [dataForm, setDataForm] = useState({
    pertanyaan: "",
    jawaban: "",
  })

  useEffect(() => {
    loadFaq()
  }, [])

  const loadFaq = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await faqAPI.fetchFaq()
      setFaq(data)
    } catch (err) {
      console.error(err)
      setError("Gagal memuat data FAQ")
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
        await faqAPI.updateFaq(editId, dataForm)
        setSuccess("FAQ berhasil diperbarui")
      } else {
        await faqAPI.create(dataForm)
        setSuccess("FAQ berhasil ditambahkan")
      }
      setDataForm({ pertanyaan: "", jawaban: "" })
      setEditId(null)
      loadFaq()
    } catch (err) {
      console.error(err)
      setError("Gagal menyimpan data FAQ")
    }
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setDataForm({
      pertanyaan: item.pertanyaan,
      jawaban: item.jawaban,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus FAQ ini?")) return
    try {
      await faqAPI.deleteFaq(id)
      setSuccess("FAQ berhasil dihapus")
      loadFaq()
    } catch (err) {
      console.error(err)
      setError("Gagal menghapus FAQ")
    }
  }

  const columns = ["#", "Pertanyaan", "Jawaban", "Aksi"]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen FAQ</h2>

      {/* Form Tambah/Edit */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit FAQ" : "Tambah FAQ Baru"}
        </h3>

        {success && <AlertBox type="success">{success}</AlertBox>}
        {error && <AlertBox type="error">{error}</AlertBox>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="pertanyaan"
            value={dataForm.pertanyaan}
            placeholder="Pertanyaan"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            required
          />

          <textarea
            name="jawaban"
            value={dataForm.jawaban}
            placeholder="Jawaban"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            rows={4}
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            {editId ? "Simpan Perubahan" : "Simpan FAQ"}
          </button>
        </form>
      </div>

      {/* Tabel Daftar FAQ */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Daftar FAQ</h3>

        {loading ? (
          <LoadingSpinner text="Memuat data FAQ..." />
        ) : faq.length === 0 ? (
          <EmptyState text="Belum ada data FAQ" />
        ) : (
          <GenericTable
            columns={columns}
            data={faq}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{item.pertanyaan}</td>
                <td className="px-6 py-3">{item.jawaban}</td>
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
