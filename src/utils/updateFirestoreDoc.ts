import { doc, updateDoc, Firestore } from 'firebase/firestore'

export async function updateFirestoreDoc(db: Firestore, collection: string, document: string, firestoreObj: object) {
  const docRef = doc(db, collection, document)
  try {
    await updateDoc(docRef, firestoreObj)
  } catch (error) {
    console.error(error)
  }
}
