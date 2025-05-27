import { db } from '../firebase'
import { Tooltip } from '@mui/material'
import { useAppContext } from '../context/AppContext'
import { StyledIconButton } from './InputIconButton'
import { updateFirestoreDoc } from '../utils/updateFirestoreDoc'
import { logError } from '../utils/logError'
import { TOGGLE_BTN_HIDE_PROJECTS, TOGGLE_BTN_SHOW_PROJECTS } from '../utils/constants'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'

const COLLECTION = 'config'
const DOCUMENT = 'editorSettings'

const InputToggleWorkingFiles = () => {
  const { hideWorkingFiles, setHideWorkingFiles } = useAppContext()

  const handleOpen = async () => {
    try {
      const firestoreObj = { hideWorkingFiles: !hideWorkingFiles }
      setHideWorkingFiles(!hideWorkingFiles)
      await updateFirestoreDoc(db, COLLECTION, DOCUMENT, firestoreObj)
    } catch (error) {
      logError('Error updating Firestore document', 'InputToggleWorkingFiles', error)
    }
  }

  const handleToggleButtonLabel = hideWorkingFiles ? TOGGLE_BTN_SHOW_PROJECTS : TOGGLE_BTN_HIDE_PROJECTS

  return (
    <>
      <Tooltip title={handleToggleButtonLabel}>
        <StyledIconButton onClick={handleOpen} aria-label={handleToggleButtonLabel}>
          {hideWorkingFiles ? <ToggleOffIcon /> : <ToggleOnIcon />}
        </StyledIconButton>
      </Tooltip>
    </>
  )
}
export default InputToggleWorkingFiles
