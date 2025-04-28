import { Box } from '@mui/material'
import EditorWorkspacePreview from './EditorWorkspacePreview'
import Split from 'react-split'
import EditorWorkingFiles from './EditorWorkingFiles'
import { useAppContext } from '../context/AppContext'

const EditorContainer = () => {
  const { hideWorkingFiles } = useAppContext()

  const className = hideWorkingFiles ? 'no-working-files' : ''
  return (
    <Split className='split-component' sizes={[10, 90]}>
      <Box className={className}>
        <EditorWorkingFiles />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <EditorWorkspacePreview />
      </Box>
    </Split>
  )
}
export default EditorContainer
