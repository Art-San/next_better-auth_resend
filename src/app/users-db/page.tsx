'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'

export default function UsersDB() {
  const { storedValue } = useLocalStorage('user', null)

  return <div>{storedValue?.name || 'нет'}</div>
}
