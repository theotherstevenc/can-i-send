import { Box } from '@mui/material'
import EditorWorkspacePreview from './EditorWorkspacePreview'
import Split from 'react-split'
import EditorWorkingFiles from './EditorWorkingFiles'
import { useEditorContext } from '../context/EditorContext'

const EditorContainer = () => {
  const { files } = useEditorContext()
  const isFilesEmpty = files.length === 0 || files.length === undefined
  // check for undefined due to api response

  return (
    <Split className='split-component' sizes={[10, 90]}>
      <Box className={isFilesEmpty ? 'no-working-files' : ''}>
        <EditorWorkingFiles />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <EditorWorkspacePreview />
      </Box>
    </Split>
  )
}
export default EditorContainer
