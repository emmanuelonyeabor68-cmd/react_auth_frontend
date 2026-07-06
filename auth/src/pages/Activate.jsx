import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'

const Activate = () => {
    const { uid, token } = useParams()
    const navigate = useNavigate()
    const [status, setStatus] = useState('Activating your account...')

    useEffect(() => {
        const activate = async () => {
            try {
                await api.post('/api/auth/users/activation/', { uid, token })
                setStatus('Account activated! Redirecting to login...')
                setTimeout(() => navigate('/login'), 2000)
            } catch (err) {
                setStatus('Activation failed. Link may have expired.')
            }
        }

        activate()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <p className="text-gray-700 text-lg">{status}</p>
            </div>
        </div>
    )
}

export default Activate