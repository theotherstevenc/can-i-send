import { storageFeatureFlag } from './storageFeatureFlag'

const managePersistentState = async (firestoreObj: object) => {
  const USE_LOCAL_STORAGE = await storageFeatureFlag()

  if (USE_LOCAL_STORAGE) {
    const existingData = JSON.parse(localStorage.getItem('persistentState') || '{}')
    const updatedData = { ...existingData, ...firestoreObj }

    localStorage.setItem('persistentState', JSON.stringify(updatedData))
  } else {
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
}

export default managePersistentState
