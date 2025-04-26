import './App.css'
import { Box, ThemeProvider } from '@mui/material'
import { theme } from './styles/global.theme'
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

function App() {
  return (
    <>
      <EditorProvider>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex', gap: '0.175rem', margin: '0.5rem' }}>
            <Box>
              <InputMarkupSettings />
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: '0.175rem', flexWrap: 'wrap' }}>
              <InputSenderSettings />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.175rem' }}>
              <InputUpdateFiles />
              <InputDeleteFile />
              <InputCreateNewFile />
              <InputFileUpload />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: '0.175rem', margin: '0 0.5rem' }}>
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
