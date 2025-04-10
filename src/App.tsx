import './App.css'
import { Box, ThemeProvider } from '@mui/material'
import { boxStyles } from './styles/global.styles'
import { theme } from './styles/global.theme'
import EditorSelectorButtons from './components/EditorSelectorButtons'
import EditorSendButton from './components/EditorSendButton'
import EditorWorkspacePreview from './components/EditorWorkspacePreview'
import InputEmailListSubjectLine from './components/InputEmailListSubjectLine'
import InputCreateNewFile from './components/InputCreateNewFile'
import InputFileUpload from './components/InputFileUpload'
import InputMarkupSettings from './components/InputMarkupSettings'
import InputSenderSettings from './components/InputSenderSettings'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={boxStyles}>
          <InputMarkupSettings />
          <InputSenderSettings />
          <InputCreateNewFile />
          <InputFileUpload />
        </Box>
        <Box sx={boxStyles}>
          <EditorSelectorButtons />
          <InputEmailListSubjectLine />
          <EditorSendButton />
        </Box>
        <EditorWorkspacePreview />
      </ThemeProvider>
    </>
  )
}

export default App
