import './App.css'
import { Box } from '@mui/material'
import { boxAppStyles, boxControlStyles } from './util/styles'
import { EditorProvider } from './context/EditorContext'
import WorkspaceEditorPreview from './components/WorkspaceEditorPreview'
import EditorSelectorButtons from './components/EditorSelectorButtons'
import EditorEmailListInput from './components/EditorEmailListInput'
import EditorSendEmailButton from './components/EditorSendEmailButton'
import SnackbarAlert from './components/SnackbarAlert'
import BackdropProgress from './components/BackdropProgress'

function App() {
  return (
    <Box sx={boxAppStyles}>
      <EditorProvider>
        <SnackbarAlert />
        <BackdropProgress />
        <Box sx={boxControlStyles}>
          <EditorSelectorButtons />
          <EditorEmailListInput />
          <EditorSendEmailButton />
        </Box>
        <WorkspaceEditorPreview />
      </EditorProvider>
    </Box>
  )
}

export default App
