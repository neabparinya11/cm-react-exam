import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com",
})

axiosInstance.interceptors.request.use(
    config => {
        config.headers['CMReq'] = 'request'
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    config => {
        config.headers['CMERes'] = 'response'
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default axiosInstance