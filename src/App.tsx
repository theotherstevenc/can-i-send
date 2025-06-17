import './App.css'
import { EditorProvider } from './context/EditorContext'
import { usePreferredTheme } from './utils/usePreferredTheme'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { editorActionsStyles, inputConfigStyles, inputSenderSettingsStyles } from './styles/global.styles'
import { EditorContainer, EditorActions, EditorSelectorButtons, EditorSendButton, InputEmailListSubjectLine, InputMarkupSettings, InputSenderSettings } from './components'

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
          <EditorActions />
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
