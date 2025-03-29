export const storageFeatureFlag = async () => {
  const API_URL = '/api/use-local-storage'
  const HTTP_METHOD = 'GET'

  try {
    const response = await fetch(API_URL, {
      method: HTTP_METHOD,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error)
    }

    const data = await response.json()

    return data.useLocalStorage
  } catch (error) {
    console.error('Error fetching storage feature flag:', error)

    return false
  }
}
