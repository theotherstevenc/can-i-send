import { Tooltip } from '@mui/material'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import { StyledIconButton } from './InputIconButton'
import { useEditorContext } from '../context/EditorContext'

const InputToggleWorkingFiles = () => {
  const { hideWorkingFiles, setHideWorkingFiles } = useEditorContext()

  const handleOpen = () => {
    setHideWorkingFiles(!hideWorkingFiles)
  }

  return (
    <>
      <Tooltip title='Show/Hide Working Files'>
        <StyledIconButton onClick={handleOpen} aria-label='Show/Hide Working Files'>
          {hideWorkingFiles ? <ToggleOffIcon /> : <ToggleOnIcon />}
        </StyledIconButton>
      </Tooltip>
    </>
  )
}
export default InputToggleWorkingFiles
