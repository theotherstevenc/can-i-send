export const updateStore = async (COLLECTION: string, DOCUMENT: string, ACTION: string, firestoreObj: object) => {
  const API_URL = '/api/update-editor'
  const HTTP_METHOD_POST = 'POST'

  try {
    const response = await fetch(API_URL, {
      method: HTTP_METHOD_POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ COLLECTION, DOCUMENT, ACTION, firestoreObj }),
    })

    if (response.ok) {
      console.log(DOCUMENT + ' :saved')
    }
  } catch (error) {
    console.error('Error updating markup settings:', error)
  }
}
