import './App.css'
import { Box } from '@mui/material'
import { boxAppStyles, boxContentSettingsStyles, boxControlStyles, boxCustomSettingsStyles } from './util/styles'
import { EditorProvider } from './context/EditorContext'
import WorkspaceEditorPreview from './components/WorkspaceEditorPreview'
import EditorSelectorButtons from './components/EditorSelectorButtons'
import EditorEmailListInput from './components/EditorEmailListInput'
import EditorSendEmailButton from './components/EditorSendEmailButton'
import SnackbarAlert from './components/SnackbarAlert'
import BackdropProgress from './components/BackdropProgress'
import FormControlLabels from './components/FormControlLabels'

function App() {
  return (
    <Box sx={boxAppStyles}>
      <EditorProvider>
        <SnackbarAlert />
        <BackdropProgress />
        <Box sx={boxContentSettingsStyles}>
          <Box sx={boxCustomSettingsStyles}>
            <FormControlLabels />
          </Box>
        </Box>
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
