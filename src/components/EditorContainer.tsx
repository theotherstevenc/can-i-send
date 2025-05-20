import { Box } from '@mui/material'
import EditorWorkspacePreview from './EditorWorkspacePreview'
import Split from 'react-split'
import EditorWorkingFiles from './EditorWorkingFiles'
import { useAppContext } from '../context/AppContext'
import usePersistentSizes from '../utils/usePersistentSizes'
import { EDITOR_CONTAINER_SPLIT_SIZES_DEFAULT, EDITOR_CONTAINER_SPLIT_SIZES_MINIMUM, EDITOR_CONTAINER_SPLIT_SIZES_STORAGE_KEY } from '../utils/constants'

const EditorContainer = () => {
  const { hideWorkingFiles, setHideWorkingFiles } = useAppContext()

  const [sizes, setSizes] = usePersistentSizes(EDITOR_CONTAINER_SPLIT_SIZES_STORAGE_KEY, EDITOR_CONTAINER_SPLIT_SIZES_DEFAULT)

  const handleDrag = (sizes: number[]) => {
    setHideWorkingFiles(false)
    setSizes(sizes)
  }

  const handleDragEnd = (sizes: number[]) => {
    const isWorkingFilesHidden = sizes[0] < 10

    if (isWorkingFilesHidden) {
      setHideWorkingFiles(true)
      setSizes([0, 100])
    } else {
      setHideWorkingFiles(false)
      setSizes(sizes)
    }
  }

  const className = hideWorkingFiles ? 'no-working-files' : ''
  return (
    <Split className='split-component' sizes={sizes} minSize={EDITOR_CONTAINER_SPLIT_SIZES_MINIMUM} onDragEnd={handleDragEnd} onDrag={handleDrag}>
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
