import { Box } from '@mui/material'
import EditorWorkspacePreview from './EditorWorkspacePreview'
import Split from 'react-split'
import EditorWorkingFiles from './EditorWorkingFiles'

const EditorContainer = () => {
  return (
    <Split className='split-component' sizes={[10, 90]}>
      <Box sx={{ backgroundColor: '#f0f0f0' }}>
        <EditorWorkingFiles />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <EditorWorkspacePreview />
      </Box>
    </Split>
  )
}
export default EditorContainer
