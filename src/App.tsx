import './App.css'
import { Box } from '@mui/material'
import { boxAppStyles } from './util/styles'
import { EditorProvider } from './context/EditorContext'
import WorkspaceEditorPreview from './components-v2/WorkspaceEditorPreview'

function App() {
  return (
    <Box sx={boxAppStyles}>
      <EditorProvider>
        <WorkspaceEditorPreview />
      </EditorProvider>
    </Box>
  )
}

export default App
