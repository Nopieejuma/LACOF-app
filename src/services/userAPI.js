import axios from "axios"

const API_URL = "https://tqonvncxqejnogqjpgkz.supabase.co/rest/v1/user"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxb252bmN4cWVqbm9ncWpwZ2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNTc2MzYsImV4cCI6MjA2NDkzMzYzNn0.yT5mnMMVzcbh3ggPIK51nlm6pOJRYNvhmEeh16JbDCI"

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
}

export const userAPI = {
  async create(data) {
    const res = await axios.post(API_URL, data, { headers })
    return res.data
  },

  async fetchUsers() {
    const res = await axios.get(API_URL, { headers })
    return res.data
  },

  async updateUser(id, data) {
    const res = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers })
    return res.data
  },

  async deleteUser(id) {
    const res = await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    return res.data
  }
}
