import { Box } from '@mui/material'
import { inputActionsStyles } from '../styles/global.styles'
import {
  Authenticator,
  FontSizeControls,
  InputCreateNewFile,
  InputDeleteFile,
  InputFileUpload,
  InputFormatHTML,
  InputLockFile,
  InputToggleEditorTheme,
  InputToggleWorkingFiles,
  InputUpdateFiles,
} from '../components'

const EditorActions = () => {
  return (
    <Box sx={inputActionsStyles}>
      <InputFormatHTML />
      <FontSizeControls />
      <InputLockFile />
      <InputToggleEditorTheme />
      <InputToggleWorkingFiles />
      <InputCreateNewFile />
      <InputUpdateFiles />
      <InputDeleteFile />
      <InputFileUpload />
      <Authenticator />
    </Box>
  )
}

export default EditorActions
