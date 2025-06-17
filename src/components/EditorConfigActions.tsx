import { Box } from '@mui/material'
import { inputActionsStyles, inputConfigStyles, inputSenderSettingsStyles } from '../styles/global.styles'
import {
  Authenticator,
  FontSizeControls,
  InputCreateNewFile,
  InputDeleteFile,
  InputFileUpload,
  InputFormatHTML,
  InputLockFile,
  InputMarkupSettings,
  InputSenderSettings,
  InputToggleEditorTheme,
  InputToggleWorkingFiles,
  InputUpdateFiles,
} from '../components'

const EditorConfigActions = () => (
  <Box sx={inputConfigStyles}>
    <Box>
      <InputMarkupSettings />
    </Box>
    <Box sx={inputSenderSettingsStyles}>
      <InputSenderSettings />
    </Box>
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
  </Box>
)

export default EditorConfigActions
