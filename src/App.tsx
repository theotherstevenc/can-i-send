import './App.css'
import { Box } from '@mui/material'
import { boxStyles } from './styles/global.styles'
import EditorSelectorButtons from './components/EditorSelectorButtons'
import EditorSendButton from './components/EditorSendButton'
import EditorWorkspacePreview from './components/EditorWorkspacePreview'
import InputEmailListSubjectLine from './components/InputEmailListSubjectLine'
import InputFileUpload from './components/InputFileUpload'
import InputMarkupSettings from './components/InputMarkupSettings'
import InputSenderSettings from './components/InputSenderSettings'

function App() {
  return (
    <>
      <Box sx={boxStyles}>
        <InputMarkupSettings />
        <InputSenderSettings />
        <InputFileUpload />
      </Box>
      <Box sx={boxStyles}>
        <EditorSelectorButtons />
        <InputEmailListSubjectLine />
        <EditorSendButton />
      </Box>
      <EditorWorkspacePreview />
    </>
  )
}

export default App
