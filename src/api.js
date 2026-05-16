import axios from 'axios'

const BACKEND_URL = 'https://pnrconfirm-api.onrender.com'

const api = axios.create({
  baseURL: BACKEND_URL,
})

export async function checkPNR(pnr) {
  const { data } = await api.post('/api/pnr/check', { pnr })
  return data
}