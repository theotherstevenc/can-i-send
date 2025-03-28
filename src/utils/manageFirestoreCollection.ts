const manageFirestoreCollection = async (firestoreField: object) => {
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

export default manageFirestoreCollection
