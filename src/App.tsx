import './App.css'
import { Box } from '@mui/material'
import { boxAppStyles } from './util/styles'
import { EditorProvider } from './context/EditorContext'
import WorkspaceEditorPreview from './components/WorkspaceEditorPreview-v2'
import EditorSelectorButtons from './components/EditorSelectorButtons-v2'

function App() {
  return (
    <Box sx={boxAppStyles}>
      <EditorProvider>
        <EditorSelectorButtons />
      </EditorProvider>
      <EditorProvider>
        <WorkspaceEditorPreview />
      </EditorProvider>
    </Box>
  )
}

export default App
