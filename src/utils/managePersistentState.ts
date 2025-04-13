//TODO: rename to better describe the functionality
// it is not directly updating state
// rather it is updating the firestore document
const managePersistentState = async (COLLECTION: string, DOCUMENT: string, ACTION: string, firestoreObj: object) => {
  const API_URL = '/api/update-editor'
  const HTTP_METHOD_POST = 'POST'

  try {
    fetch(API_URL, {
      method: HTTP_METHOD_POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ COLLECTION, DOCUMENT, ACTION, firestoreObj }),
    })
  } catch (error) {
    console.error('Error updating markup settings:', error)
  }
}

export default managePersistentState
