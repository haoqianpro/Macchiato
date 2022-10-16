// import store from '@/store'
import axios from 'axios'
// import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
})

// service.interceptors.request.use(
//   config => {
//     if (store.getters.token) {
//       config.headers['X-Token'] = store.getters.token
//     }
//     return config
//   },
//   error => {
//     console.log(error)
//     return Promise.reject(error)
//   }
// )

// service.interceptors.response.use(
//   response => {
//     const res = response.data
//     if (res.code !== 0) {
//       ElMessage({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })
//     } else {
//       return res
//     }
//   },
//   error => {
//     ElMessage({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//   }
// )

export default service
