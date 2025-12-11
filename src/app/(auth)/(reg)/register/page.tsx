'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRegFormContext } from '@/contexts/RegFormContext'
import { initialRegFormData } from '@/constants/regFormData'
import { RegFormData } from '@/types/regFormData'

export default function RegisterPage() {
  const [registerForm, setRegisterForm] =
    useState<RegFormData>(initialRegFormData)
  const [invalidFormMessage, setInvalidFormMessage] = useState('')

  const router = useRouter()
  const { setRegFormData } = useRegFormContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (registerForm.phoneNumber && registerForm.password) {
      setRegFormData(registerForm)
      router.replace('/verify/verify-phone')
      // router.replace('/verify/verify-email')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, type } = e.target
    // const value = type === "checkbox" ? e.target.checked : e.target.value;
    if (invalidFormMessage) {
      setInvalidFormMessage('')
    }

    setRegisterForm((prev) => ({ ...prev, [id]: e.target.value }))
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Регистрация</h1>

      {/* <form> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Почта
          </label>
          <input
            type="email"
            id="email"
            value={registerForm.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Телефон
          </label>
          <input
            type="phone"
            id="phoneNumber"
            value={registerForm.phoneNumber}
            onChange={handleChange}
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
            value={registerForm.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}
