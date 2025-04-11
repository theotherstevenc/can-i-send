import './App.css'
import { Box, ThemeProvider } from '@mui/material'
import { boxStyles } from './styles/global.styles'
import { theme } from './styles/global.theme'
import EditorSelectorButtons from './components/EditorSelectorButtons'
import EditorSendButton from './components/EditorSendButton'
import InputEmailListSubjectLine from './components/InputEmailListSubjectLine'
import InputCreateNewFile from './components/InputCreateNewFile'
import InputFileUpload from './components/InputFileUpload'
import InputMarkupSettings from './components/InputMarkupSettings'
import InputSenderSettings from './components/InputSenderSettings'
import EditorContainer from './components/EditorContainer'

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
        <EditorContainer />
      </ThemeProvider>
    </>
  )
}

export default App
