import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleGoogleLogin = () => {
        window.location.href = 'https://django-auth-biolerplate.onrender.com/social-auth/login/google-oauth2/'
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await api.post('/api/auth/login/', formData)
            login(response.data.access)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
                    Welcome Back
                </h2>

                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <button
                type='button'
                onClick={handleGoogleLogin}
                className='w-full boarder border-gray-300 text-gray-700 py-8 rounded hover:bg bg-gray-50 flex items-center justify-center gap-2'>
                    <img src="https://www.google.com/favicon.ico" className='w-4 h-4'/>
                    Continue with Google
                </button>

                <p className="text-center text-sm mt-4">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-indigo-600 hover:underline">
                        Register
                    </Link>
                </p>
                <p className="text-center text-sm mt-2">
    <Link to="/ForgetPassword" className="text-indigo-600 hover:underline">
        Forgot Password?
    </Link>
</p>
            </div>
        </div>
    )
}

export default Login