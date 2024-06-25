import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { store } from '@/store'

const $host: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

$host.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (err) => {
    store.commit('SET_ERROR', err.message)
  }
)

export { $host }
