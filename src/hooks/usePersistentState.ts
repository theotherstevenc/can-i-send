import { useState, useEffect } from 'react'

const getInitialState = <T>(key: string, defaultValue: T): T => {
  const storedValue = localStorage.getItem(key)
  if (storedValue !== null) {
    try {
      return JSON.parse(storedValue)
    } catch {
      return storedValue as unknown as T
    }
  }
  return defaultValue
}

const usePersistentState = <T>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(getInitialState(key, defaultValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState] as const
}

export default usePersistentState
