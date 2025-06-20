import { db } from '../firebase'
import { Tooltip } from '@mui/material'
import { useEditorContext } from '../context/EditorContext'
import { StyledIconButton } from './StyledIconButton'
import { updateFirestoreDoc } from '../utils/updateFirestoreDoc'
import { logError } from '../utils/logError'
import { INPUT_LOCK_FILE_LABEL_LOCK, INPUT_LOCK_FILE_LABEL_UNLOCK } from '../utils/constants'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'

const InputLockFile = () => {
  const { workingFileID, isFileLocked, setIsFileLocked } = useEditorContext()

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

  const handleInputLockLabel = isFileLocked ? INPUT_LOCK_FILE_LABEL_UNLOCK : INPUT_LOCK_FILE_LABEL_LOCK

  return (
    <>
      <Tooltip title={handleInputLockLabel}>
        <StyledIconButton onClick={handleClick} aria-label={handleInputLockLabel}>
          {isFileLocked ? <LockIcon /> : <LockOpenIcon />}
        </StyledIconButton>
      </Tooltip>
    </>
  )
}
export default InputLockFile
