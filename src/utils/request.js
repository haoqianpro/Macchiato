// import store from '@/store'
import axios from 'axios'
// import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (config.url !== '/login') {
      const token = sessionStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
    }
    return config
  },
  error => {
    // console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export default service
