import axios from "axios"
import { useAuthStore } from "../stores/useAuthStore"
export const API_URL = "https://44.209.155.89"

export default axios.create({ baseURL: API_URL })

const getCurrentAccessToken = () => useAuthStore.getState().token

export const axiosPrivate = axios.create({
    baseURL: API_URL,
})

axiosPrivate.interceptors.request.use(async (config) => {
    const token = getCurrentAccessToken()
    if (token) {
        config.headers.Authorization = `Token ${token}`
    }
    return config
})
