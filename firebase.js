import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT)

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()

export default db
