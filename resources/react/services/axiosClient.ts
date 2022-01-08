import axios from "axios"
import { API_URL } from "./urlSet"

const axiosClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export default axiosClient