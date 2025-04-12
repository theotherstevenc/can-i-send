const managePersistentState = async (firestoreObj: object) => {
  const API_URL = '/api/update-editor'
  const HTTP_METHOD_POST = 'POST'
  const COLLECTION = 'config'
  const DOCUMENT = 'editorSettings'
  const ACTION = 'update'
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
