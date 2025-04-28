import { Tooltip } from '@mui/material'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import { StyledIconButton } from './InputIconButton'
import { useEditorContext } from '../context/EditorContext'
import { TOGGLE_BUTTON_HIDE_PROJECTS, TOGGLE_BUTTON_SHOW_PROJECTS } from '../utils/constants'

const InputToggleWorkingFiles = () => {
  const { hideWorkingFiles, setHideWorkingFiles } = useEditorContext()

  const handleOpen = () => {
    setHideWorkingFiles(!hideWorkingFiles)
  }

  const handleToggleButtonLabel = hideWorkingFiles ? TOGGLE_BUTTON_SHOW_PROJECTS : TOGGLE_BUTTON_HIDE_PROJECTS

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
