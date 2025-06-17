import { db } from '../firebase'
import { Tooltip } from '@mui/material'
import { useAppContext } from '../context/AppContext'
import { StyledIconButton } from './StyledIconButton'
import { updateFirestoreDoc } from '../utils/updateFirestoreDoc'
import { logError } from '../utils/logError'
import { TOGGLE_BTN_DARK_MODE, TOGGLE_BTN_LIGHT_MODE } from '../utils/constants'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

const COLLECTION = 'config'
const DOCUMENT = 'editorSettings'

const InputToggleEditorTheme = () => {
  const { isDarkMode, setIsDarkMode } = useAppContext()

  const handleOpen = async () => {
    try {
      const firestoreObj = { isDarkMode: !isDarkMode }
      await updateFirestoreDoc(db, COLLECTION, DOCUMENT, firestoreObj)
      setIsDarkMode(!isDarkMode)
    } catch (error) {
      logError('Failed to toggle editor theme:', 'InputToggleEditorTheme', error)
    }
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
