import { createContext, useState, useContext, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)  // ← add this

    // runs once when app loads
    useEffect(() => {
        const restoreSession = async () => {
            try {
                // try to get new access token using cookie
                const res = await api.post('/api/auth/refresh/')
                setAccessToken(res.data.access)
            } catch (err) {
                // cookie expired or doesn't exist — stay logged out
                setAccessToken(null)
            } finally {
                setLoading(false)
            }
        }

        restoreSession()
    }, [])

    const login = (token) => {
        setAccessToken(token)
    }

    const logout = async () => {
        try {
            await api.post('/api/auth/logout/')
        } catch (err) {
            console.log(err)
        }
        setAccessToken(null)
        setUser(null)
    }

    // don't render anything until session is restored
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ accessToken, user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)