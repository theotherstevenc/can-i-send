import { useState } from 'react'
import { FAILED_TO_PARSE_LOCALSTORAGE } from './constants'

function usePersistentValue<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (error) {
        console.error(FAILED_TO_PARSE_LOCALSTORAGE, error)
        return defaultValue
      }
    }
    return defaultValue
  })

  const updateValue = (newValue: T) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, updateValue] as const
}

export default usePersistentValue
