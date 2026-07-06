import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

api.interceptors.response.use(
    response => response,
    async error => {
        const original = error.config

        if (
            original.url.includes('/api/auth/login/') ||
            original.url.includes('/api/auth/refresh/')
        ) {
            return Promise.reject(error)
        }

        if (error.response?.status === 401 && !original._retry) {
            original._retry = true

            try {
                const res = await api.post('/api/auth/refresh/')
                const newAccessToken = res.data.access
                original.headers['Authorization'] = `Bearer ${newAccessToken}`
                return api(original)
            } catch (err) {
                window.location.href = '/login'
            }
        }

        return Promise.reject(error)
    }
)

export default api