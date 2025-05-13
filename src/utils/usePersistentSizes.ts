import { useState } from 'react'

function usePersistentSizes(key: string, defaultSizes: number[]) {
  const [sizes, setSizes] = useState<number[]>(() => {
    const savedSizes = localStorage.getItem(key)
    return savedSizes ? JSON.parse(savedSizes) : defaultSizes
  })

  const updateSizes = (newSizes: number[]) => {
    setSizes(newSizes)
    localStorage.setItem(key, JSON.stringify(newSizes))
  }

  return [sizes, updateSizes] as const
}

export default usePersistentSizes
