import { logError } from './logError'

export const encryptString = async (text: string): Promise<string> => {
  const API_URL = '/api/encrypt'
  const HTTP_METHOD_POST = 'POST'

  if (!text) return ''
  try {
    const response = await fetch(API_URL, {
      method: HTTP_METHOD_POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error)
    }

    const data = await response.json()
    return data.encrypted
  } catch (error) {
    logError('Error encrypting string:', 'encryptString', error)
    return ''
  }
}
