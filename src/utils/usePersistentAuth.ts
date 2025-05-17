import { useState } from 'react'
import { FAILED_TO_PARSE_LOCALSTORAGE } from './constants'

const usePersistentAuth = (key: string, auth: boolean) => {
  const [isAuth, setIsAuth] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem(key)
    if (savedAuth) {
      try {
        return JSON.parse(savedAuth)
      } catch (error) {
        console.error(FAILED_TO_PARSE_LOCALSTORAGE, error)
        return auth
      }
    }
    return auth
  })

  const updateAuth = (newAuth: boolean) => {
    setIsAuth(newAuth)
    localStorage.setItem(key, JSON.stringify(newAuth))
  }

  return [isAuth, updateAuth] as const
}

export default usePersistentAuth
