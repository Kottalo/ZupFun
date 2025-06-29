import axios from 'axios'
import type { AxiosInstance } from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export function useAxios(): AxiosInstance {
  return axiosInstance
}
