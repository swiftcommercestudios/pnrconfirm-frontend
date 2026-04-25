import axios from 'axios'

const PROD_URL = 'https://web-production-8bac5.up.railway.app'

const api = axios.create({
  baseURL: import.meta.env.PROD ? PROD_URL : '/api',
})

export async function checkPNR(pnr) {
  const { data } = await api.post('/api/pnr/check', { pnr })
  return data
}