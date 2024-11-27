import './App.css'
import { Box } from '@mui/material'

import { boxAppStyles, boxContentSettingsStyles, boxControlStyles, boxCustomSettingsStyles, boxSenderSettingsStyles } from './styles/styles'
import { EditorProvider } from './context/EditorContext'
import {
  BackdropProgress,
  EditorEmailListInput,
  EditorSelectorButtons,
  EditorSendEmailButton,
  FormControlLabels,
  FormSenderSettingsInput,
  FormUploadConvertButton,
  SnackbarAlert,
  WorkspaceEditorContainer,
} from './components'

function App() {
  return (
    <EditorProvider>
      <Box sx={boxAppStyles}>
        <SnackbarAlert />
        <BackdropProgress />
        <Box sx={boxContentSettingsStyles}>
          <Box sx={boxCustomSettingsStyles}>
            <FormControlLabels />
          </Box>
          <Box sx={boxSenderSettingsStyles}>
            <FormSenderSettingsInput />
          </Box>
          <FormUploadConvertButton />
        </Box>
        <Box sx={boxControlStyles}>
          <EditorSelectorButtons />
          <EditorEmailListInput />
          <EditorSendEmailButton />
        </Box>
        <WorkspaceEditorContainer />
      </Box>
    </EditorProvider>
  )
}

export default App
