export const updateStore = async (
  COLLECTION: string,
  DOCUMENT: string,
  ACTION: string,
  API_URL: string,
  HTTP_METHOD: string,
  firestoreObj?: object,
  setTriggerFetch?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(API_URL, {
      method: HTTP_METHOD,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ COLLECTION, DOCUMENT, ACTION, firestoreObj }),
    })

    if (response.ok) {
      if (setTriggerFetch) {
        setTriggerFetch((prevState) => !prevState)
      }

      return { success: true }
    } else {
      const errorData = await response.json()
      return { success: false, message: errorData.message }
    }
  } catch (error) {
    console.error('Error in updateStore:', error)
    return { success: false, message: 'Network error' }
  }
}
