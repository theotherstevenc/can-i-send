import { storageFeatureFlag } from './storageFeatureFlag'

const managePersistentState = async (firestoreField: object) => {
  const USE_LOCAL_STORAGE = await storageFeatureFlag()

  if (USE_LOCAL_STORAGE) {
    const existingData = JSON.parse(localStorage.getItem('persistentState') || '{}')
    const updatedData = { ...existingData, ...firestoreField }

    localStorage.setItem('persistentState', JSON.stringify(updatedData))
  } else {
    const API_URL = '/api/manage-firestore-collection'
    const HTTP_METHOD_POST = 'POST'
    try {
      fetch(API_URL, {
        method: HTTP_METHOD_POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firestoreField }),
      })
    } catch (error) {
      console.error('Error updating markup settings:', error)
    }
  }
}

export default managePersistentState
