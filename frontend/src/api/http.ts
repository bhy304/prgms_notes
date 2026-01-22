import axios from 'axios'

import { API_BASE_URL } from '../settings'

const baseURL = API_BASE_URL

export const httpClient = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true,
})
