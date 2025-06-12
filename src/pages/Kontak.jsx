import { useEffect, useState } from "react"
import { kontakAPI } from "../services/kontakAPI"
import LoadingSpinner from "../components/LoadingSpinner"
import AlertBox from "../components/AlertBox"

export default function Kontak() {
  const [kontakList, setKontakList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    loadKontak()
  }, [])

  const loadKontak = async () => {
    try {
      setLoading(true)
      const data = await kontakAPI.fetchKontak()
      setKontakList(data)
    } catch (err) {
      console.error(err)
      setError("Gagal memuat data kontak")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Daftar Kontak</h2>

      {loading && <LoadingSpinner text="Memuat kontak..." />}
      {error && <AlertBox type="error">{error}</AlertBox>}

      <div className="flex flex-wrap gap-6">
        {kontakList.map((item, index) => (
          <div key={index} className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
              <div className="card-actions justify-end">
                <button className="btn btn-square btn-sm btn-ghost cursor-default">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="font-semibold text-lg text-gray-700">📨 {item.nama}</p>
              <p className="text-sm text-gray-600">{item.email}</p>
              <p className="mt-2 text-gray-700">{item.pesan}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
