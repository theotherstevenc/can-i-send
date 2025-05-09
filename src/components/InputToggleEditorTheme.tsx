import { Tooltip } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { StyledIconButton } from './InputIconButton'
import { TOGGLE_BTN_DARK_MODE, TOGGLE_BTN_LIGHT_MODE } from '../utils/constants'
import { useAppContext } from '../context/AppContext'
import { updateStore } from '../utils/updateStore'

const API_URL = '/api/update-editor'
const HTTP_METHOD = 'POST'
const COLLECTION = 'config'
const DOCUMENT = 'editorSettings'
const ACTION = 'update'

const InputToggleEditorTheme = () => {
  const { isDarkMode, setIsDarkMode } = useAppContext()

  const handleOpen = () => {
    const firestoreObj = { isDarkMode: !isDarkMode }
    setIsDarkMode(!isDarkMode)
    updateStore(COLLECTION, DOCUMENT, ACTION, API_URL, HTTP_METHOD, firestoreObj)
  }

  const handleToggleButtonLabel = isDarkMode ? TOGGLE_BTN_LIGHT_MODE : TOGGLE_BTN_DARK_MODE

  return (
    <>
      <Tooltip title={handleToggleButtonLabel}>
        <StyledIconButton onClick={handleOpen} aria-label={handleToggleButtonLabel}>
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </StyledIconButton>
      </Tooltip>
    </>
  )
}
export default InputToggleEditorTheme
