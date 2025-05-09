import { Tooltip } from '@mui/material'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import { StyledIconButton } from './InputIconButton'
import { TOGGLE_BTN_HIDE_PROJECTS, TOGGLE_BTN_SHOW_PROJECTS } from '../utils/constants'
import { useAppContext } from '../context/AppContext'
import { updateStore } from '../utils/updateStore'

const API_URL = '/api/update-editor'
const HTTP_METHOD = 'POST'
const COLLECTION = 'config'
const DOCUMENT = 'editorSettings'
const ACTION = 'update'

const InputToggleWorkingFiles = () => {
  const { hideWorkingFiles, setHideWorkingFiles } = useAppContext()

  const handleOpen = () => {
    const firestoreObj = { hideWorkingFiles: !hideWorkingFiles }
    setHideWorkingFiles(!hideWorkingFiles)
    updateStore(COLLECTION, DOCUMENT, ACTION, API_URL, HTTP_METHOD, firestoreObj)
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
