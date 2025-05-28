/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useEditorContext } from '../context/EditorContext'
import { StyledIconButton } from './InputIconButton'
import { Tooltip } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { updateFirestoreDoc } from '../utils/updateFirestoreDoc'
import { logError } from '../utils/logError'
import { useEffect } from 'react'

const InputLockFile = () => {
  console.log('InputLockFile rendered')
  const { workingFileID, isFileLocked, setIsFileLocked } = useEditorContext()
  console.log('InputLockFile', workingFileID, isFileLocked)

  const COLLECTION = 'workingFiles'
  const DOCUMENT = workingFileID

  const handleClick = async () => {
    try {
      const firestoreObj = { isFileLocked: !isFileLocked }
      await updateFirestoreDoc(db, COLLECTION, DOCUMENT, firestoreObj)
      setIsFileLocked(!isFileLocked)
    } catch (error) {
      logError('Failed to toggle file lock:', 'InputLockFile', error)
    }
  }

  useEffect(() => {
    if (!workingFileID) return
    const fetchFileLockStatus = async () => {
      try {
        const docRef = doc(db, COLLECTION, DOCUMENT)
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
          setIsFileLocked(docSnapshot.data().isFileLocked || false)
        }
      } catch (error) {
        logError('Failed to fetch file lock status:', 'InputLockFile', error)
      }
    }

    fetchFileLockStatus()
  }, [workingFileID])

  return (
    <>
      <Tooltip title=''>
        <StyledIconButton onClick={handleClick} aria-label=''>
          {isFileLocked ? <LockIcon /> : <LockOpenIcon />}
        </StyledIconButton>
      </Tooltip>
    </>
  )
}
export default InputLockFile
