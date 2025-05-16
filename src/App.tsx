import './App.css'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import EditorSelectorButtons from './components/EditorSelectorButtons'
import EditorSendButton from './components/EditorSendButton'
import InputEmailListSubjectLine from './components/InputEmailListSubjectLine'
import InputCreateNewFile from './components/InputCreateNewFile'
import InputFileUpload from './components/InputFileUpload'
import InputMarkupSettings from './components/InputMarkupSettings'
import InputSenderSettings from './components/InputSenderSettings'
import EditorContainer from './components/EditorContainer'
import { EditorProvider } from './context/EditorContext'
import InputDeleteFile from './components/InputDeleteFile'
import InputUpdateFiles from './components/InputUpdateFiles'
import InputToggleWorkingFiles from './components/InputToggleWorkingFiles'
import InputToggleEditorTheme from './components/InputToggleEditorTheme'
import { editorActionsStyles, inputActionsStyles, inputConfigStyles, inputSenderSettingsStyles } from './styles/global.styles'
import usePreferredTheme from './utils/usePreferredTheme'
import { useEffect } from 'react'
import { signIn } from './firebase'

function App() {
  const theme = usePreferredTheme()

  useEffect(() => {
    signIn()
  }, [])

  return (
    <>
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
              <InputToggleEditorTheme />
              <InputToggleWorkingFiles />
              <InputUpdateFiles />
              <InputDeleteFile />
              <InputCreateNewFile />
              <InputFileUpload />
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
    </>
  )
}

export default App
