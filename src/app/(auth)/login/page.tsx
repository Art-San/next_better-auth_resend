'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setValue } = useLocalStorage('user', null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    setLoading(true)
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      })

      if (!response.ok) {
        setError('Что то пошло не так')
        router.push('/')
      } else {
        const user = await response.json()
        setValue(user)
        // localStorage.setItem('user', JSON.stringify(user))
        router.push('/users-db')
      }
    } catch (error) {
      // setErrorMessage(error)
      console.error(12, 'Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Вход</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Почта
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </div>
  )
}
