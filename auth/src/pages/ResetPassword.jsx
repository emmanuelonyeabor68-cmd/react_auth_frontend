import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../api/axios'

const ResetPassword = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const uid = searchParams.get('uid')
    const token = searchParams.get('token')

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await api.post('/api/auth/users/reset_password_confirm/', {
                uid,
                token,
                new_password: formData.new_password,
                re_new_password: formData.re_new_password
            })
            setSuccess('Password reset successful.')
            setTimeout(() => navigate('/login'), 2000)
        } catch (err) {
            setError('Invalid or expired token. Try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
                    Reset Password
                </h2>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="password"
                        name="new_password"
                        placeholder="New Password"
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                        type="password"
                        name="re_new_password"
                        placeholder="Confirm New Password"
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
   