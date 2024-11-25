import './App.css'
import { Box } from '@mui/material'
import { boxAppStyles, boxControlStyles } from './util/styles'
import { EditorProvider } from './context/EditorContext'
import WorkspaceEditorPreview from './components/WorkspaceEditorPreview-v2'
import EditorSelectorButtons from './components/EditorSelectorButtons-v2'
import EditorEmailListInput from './components/EditorEmailListInput-v2'
import EditorSendEmailButton from './components/EditorSendEmailButton-v2'
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
