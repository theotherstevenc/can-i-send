import { Box } from '@mui/material'
import EditorWorkspacePreview from './EditorWorkspacePreview'
import Split from 'react-split'
import EditorWorkingFiles from './EditorWorkingFiles'
import { useAppContext } from '../context/AppContext'
import usePersistentSizes from '../utils/usePersistentSizes'
import { EDITOR_CONTAINER_SPLIT_SIZES_DEFAULT, EDITOR_CONTAINER_SPLIT_SIZES_STORAGE_KEY } from '../utils/constants'

const EditorContainer = () => {
  const { hideWorkingFiles } = useAppContext()

  const [sizes, setSizes] = usePersistentSizes(EDITOR_CONTAINER_SPLIT_SIZES_STORAGE_KEY, EDITOR_CONTAINER_SPLIT_SIZES_DEFAULT)

  const className = hideWorkingFiles ? 'no-working-files' : ''
  return (
    <Split className='split-component' sizes={sizes} onDragEnd={setSizes}>
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
