import './App.css'
import { EditorProvider } from './context/EditorContext'
import { usePreferredTheme } from './utils/usePreferredTheme'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { editorActionsStyles, inputActionsStyles, inputConfigStyles, inputSenderSettingsStyles } from './styles/global.styles'

import {
  Authenticator,
  EditorContainer,
  EditorSelectorButtons,
  EditorSendButton,
  FontSizeControls,
  InputCreateNewFile,
  InputDeleteFile,
  InputEmailListSubjectLine,
  InputFileUpload,
  InputFormatHTML,
  InputLockFile,
  InputMarkupSettings,
  InputSenderSettings,
  InputToggleEditorTheme,
  InputToggleWorkingFiles,
  InputUpdateFiles,
} from './components'

function App() {
  const theme = usePreferredTheme()

  return (
    <EditorProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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

        <Box sx={editorActionsStyles}>
          <EditorSelectorButtons />
          <InputEmailListSubjectLine />
          <EditorSendButton />
        </Box>
        <EditorContainer />
      </ThemeProvider>
    </EditorProvider>
  )
}

export default App
