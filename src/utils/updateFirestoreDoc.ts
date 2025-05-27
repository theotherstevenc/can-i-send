import { doc, updateDoc, Firestore } from 'firebase/firestore'

export const updateFirestoreDoc = async (db: Firestore, collection: string, document: string, firestoreObj: object) => {
  const docRef = doc(db, collection, document)
  await updateDoc(docRef, firestoreObj)
}
