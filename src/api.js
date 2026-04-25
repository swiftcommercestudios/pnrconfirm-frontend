import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export async function checkPNR(pnr) {
  const { data } = await api.post('/pnr/check', { pnr })
  return data
}
