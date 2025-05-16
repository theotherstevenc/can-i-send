import { Tooltip } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { StyledIconButton } from './InputIconButton'
import { TOGGLE_BTN_DARK_MODE, TOGGLE_BTN_LIGHT_MODE } from '../utils/constants'
import { useAppContext } from '../context/AppContext'
import { db } from '../firebase'
import { updateFirestoreDoc } from '../utils/updateFirestoreDoc'

const COLLECTION = 'config'
const DOCUMENT = 'editorSettings'

const InputToggleEditorTheme = () => {
  const { isDarkMode, setIsDarkMode } = useAppContext()

  const handleOpen = async () => {
    const firestoreObj = { isDarkMode: !isDarkMode }
    setIsDarkMode(!isDarkMode)

    updateFirestoreDoc(db, COLLECTION, DOCUMENT, firestoreObj)
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
