import axios from 'axios'

const baseURL =
  window._ENV?.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL

export const httpClient = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true,
})
