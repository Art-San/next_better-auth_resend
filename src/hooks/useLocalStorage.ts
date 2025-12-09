import { useSyncExternalStore, useCallback, useRef } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Кеш для хранения последнего распарсенного значения
  // Это предотвращает бесконечные циклы ре-рендера, так как JSON.parse всегда возвращает новую ссылку
  const cache = useRef<{ raw: string | null; value: T }>({
    raw: null,
    value: initialValue
  })

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') return initialValue

    const raw = window.localStorage.getItem(key)

    // Если данные в localStorage не изменились, возвращаем закешированный объект
    if (cache.current.raw === raw) {
      return cache.current.value
    }

    // Если данные изменились, парсим и обновляем кеш
    try {
      const value = raw ? JSON.parse(raw) : initialValue
      cache.current = { raw, value }
      return value
    } catch (error) {
      console.error('Error parsing localStorage value:', error)
      return initialValue
    }
  }, [key, initialValue])

  const subscribe = useCallback((callback: () => void) => {
    // Слушаем изменения в других вкладках
    window.addEventListener('storage', callback)
    // Слушаем изменения в текущей вкладке (через кастомное событие)
    window.addEventListener('local-storage-change', callback)

    return () => {
      window.removeEventListener('storage', callback)
      window.removeEventListener('local-storage-change', callback)
    }
  }, [])

  const getServerSnapshot = () => initialValue

  const storedValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      // Сохраняем в localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))

      // Генерируем событие для обновления всех хуков в приложении
      window.dispatchEvent(new Event('local-storage-change'))
    } catch (error) {
      console.error('Error setting localStorage value:', error)
    }
  }

  return { storedValue, setValue } as const
}
