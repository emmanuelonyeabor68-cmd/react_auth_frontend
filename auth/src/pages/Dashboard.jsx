import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
    const { accessToken, user, setUser, logout, loading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return
        if (!accessToken) {
            navigate('/login')
            return
        }

        const fetchUser = async () => {
            try {
                const response = await api.get('/api/auth/users/me/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setUser(response.data)
            } catch (err) {
                navigate('/login')
            }
        }

        fetchUser()
    }, [accessToken, loading])

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
                    Dashboard
                </h2>

                {user && (
                    <div className="text-center mb-6">
                        <p className="text-gray-700 text-lg font-medium">
                            Welcome, {user.first_name} {user.last_name}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                            {user.email}
                        </p>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Dashboard