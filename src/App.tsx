import './App.css'
import { EditorProvider } from './context/EditorContext'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { editorActionsStyles, inputActionsStyles, inputConfigStyles, inputSenderSettingsStyles } from './styles/global.styles'
import Authenticator from './components/Authenticator'
import EditorContainer from './components/EditorContainer'
import EditorSelectorButtons from './components/EditorSelectorButtons'
import EditorSendButton from './components/EditorSendButton'
import FontSizeControls from './components/FontSizeControls'
import InputCreateNewFile from './components/InputCreateNewFile'
import InputDeleteFile from './components/InputDeleteFile'
import InputEmailListSubjectLine from './components/InputEmailListSubjectLine'
import InputFileUpload from './components/InputFileUpload'
import InputFormatHTML from './components/InputFormatHTML'
import InputLockFile from './components/InputLockFile'
import InputMarkupSettings from './components/InputMarkupSettings'
import InputSenderSettings from './components/InputSenderSettings'
import InputToggleEditorTheme from './components/InputToggleEditorTheme'
import InputToggleWorkingFiles from './components/InputToggleWorkingFiles'
import InputUpdateFiles from './components/InputUpdateFiles'
import usePreferredTheme from './utils/usePreferredTheme'

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
