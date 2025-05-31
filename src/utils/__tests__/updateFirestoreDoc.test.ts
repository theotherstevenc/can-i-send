import { describe, it, expect, vi } from 'vitest'

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  updateDoc: vi.fn(),
}))

import { updateFirestoreDoc } from '../updateFirestoreDoc'
import * as firestore from 'firebase/firestore'

describe('updateFirestoreDoc', () => {
  it('calls doc and updateDoc with correct arguments', async () => {
    const fakeDb = {} as firestore.Firestore
    const collection = 'testCollection'
    const document = 'testDocument'
    const firestoreObj = { name: 'testObject' }

    const fakeDocRef = { id: 'fakeDocRef' }
    // @ts-expect-error: we're mocking
    firestore.doc.mockReturnValue(fakeDocRef)
    // @ts-expect-error: we're mocking
    firestore.updateDoc.mockResolvedValue(undefined)

    await updateFirestoreDoc(fakeDb, collection, document, firestoreObj)

    expect(firestore.doc).toHaveBeenCalledWith(fakeDb, collection, document)
    expect(firestore.updateDoc).toHaveBeenCalledWith(fakeDocRef, firestoreObj)
  })
})
