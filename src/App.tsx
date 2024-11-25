import './App.css'
import { Box } from '@mui/material'
import { boxAppStyles, boxControlStyles } from './util/styles'
import { EditorProvider } from './context/EditorContext'
import WorkspaceEditorPreview from './components/WorkspaceEditorPreview-v2'
import EditorSelectorButtons from './components/EditorSelectorButtons-v2'
import EditorEmailListInput from './components/EditorEmailListInput-v2'

function App() {
  return (
    <Box sx={boxAppStyles}>
      <EditorProvider>
        <Box sx={boxControlStyles}>
          <EditorSelectorButtons />
          <EditorEmailListInput />
        </Box>
        <WorkspaceEditorPreview />
      </EditorProvider>
    </Box>
  )
}

export default App
