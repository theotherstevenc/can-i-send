import { useState } from 'react'
import { FAILED_TO_PARSE_LOCALSTORAGE } from './constants'

function usePersistentSizes(key: string, defaultSizes: number[]) {
  const [sizes, setSizes] = useState<number[]>(() => {
    const savedSizes = localStorage.getItem(key)
    if (savedSizes) {
      try {
        return JSON.parse(savedSizes)
      } catch (error) {
        console.error(FAILED_TO_PARSE_LOCALSTORAGE, error)
        return defaultSizes
      }
    }
    return defaultSizes
  })

  const updateSizes = (newSizes: number[]) => {
    setSizes(newSizes)
    localStorage.setItem(key, JSON.stringify(newSizes))
  }

  return [sizes, updateSizes] as const
}

export default usePersistentSizes
