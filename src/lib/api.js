import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor — unwrap the { success, data, meta, message } envelope
api.interceptors.response.use(
  (response) => {
    const body = response.data
    return {
      data: body.data,
      meta: body.meta || null,
      message: body.message || '',
    }
  },
  (error) => {
    // Build a standardized error object
    const serverMessage =
      error.response?.data?.message || error.message || 'Something went wrong'
    const status = error.response?.status || 0

    const apiError = new Error(serverMessage)
    apiError.status = status
    apiError.isNetworkError = !error.response
    apiError.originalError = error

    return Promise.reject(apiError)
  }
)

export default api
