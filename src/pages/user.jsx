import { useEffect, useState } from "react"
import { userAPI } from "../services/userAPI"
import GenericTable from "../components/GenericTable"
import AlertBox from "../components/AlertBox"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"

export default function User() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editId, setEditId] = useState(null)

  const [dataForm, setDataForm] = useState({
    user: "",
    role: "admin",
  })

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await userAPI.fetchUsers()
      setUsers(data)
    } catch (err) {
      console.error(err)
      setError("Gagal memuat data user")
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
        await userAPI.updateUser(editId, dataForm)
        setSuccess("User berhasil diperbarui")
      } else {
        await userAPI.create(dataForm)
        setSuccess("User berhasil ditambahkan")
      }
      setDataForm({ user: "", role: "admin" })
      setEditId(null)
      loadUsers()
    } catch (err) {
      console.error("Error simpan user:", err.response?.data || err.message || err)
      setError("Gagal menyimpan user")
    }
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setDataForm({
      user: item.user,
      role: item.role,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return
    try {
      await userAPI.deleteUser(id)
      setSuccess("User berhasil dihapus")
      loadUsers()
    } catch (err) {
      console.error("Error hapus user:", err)
      setError("Gagal menghapus user")
    }
  }

  const columns = ["#", "User", "Role", "Aksi"]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen User</h2>

      {/* Form Tambah/Edit */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit User" : "Tambah User Baru"}
        </h3>

        {success && <AlertBox type="success">{success}</AlertBox>}
        {error && <AlertBox type="error">{error}</AlertBox>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="user"
            value={dataForm.user}
            placeholder="Nama atau Email User"
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            required
          />

          <select
            name="role"
            value={dataForm.role}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            required
          >
            <option value="admin">Admin</option>
            <option value="super admin">Super Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            {editId ? "Simpan Perubahan" : "Simpan User"}
          </button>
        </form>
      </div>

      {/* Tabel Daftar User */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Daftar User</h3>

        {loading ? (
          <LoadingSpinner text="Memuat data user..." />
        ) : users.length === 0 ? (
          <EmptyState text="Belum ada data user" />
        ) : (
          <GenericTable
            columns={columns}
            data={users}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{item.user}</td>
                <td className="px-6 py-3 capitalize">{item.role}</td>
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
