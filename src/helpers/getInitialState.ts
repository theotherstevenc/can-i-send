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

export default getInitialState
