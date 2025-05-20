import { Box } from '@mui/material'
import EditorWorkspacePreview from './EditorWorkspacePreview'
import Split from 'react-split'
import EditorWorkingFiles from './EditorWorkingFiles'
import { useAppContext } from '../context/AppContext'
import usePersistentSizes from '../utils/usePersistentSizes'
import { EDITOR_CONTAINER_SPLIT_SIZES_DEFAULT, EDITOR_CONTAINER_SPLIT_SIZES_MINIMUM, EDITOR_CONTAINER_SPLIT_SIZES_STORAGE_KEY } from '../utils/constants'
import { clsx } from 'clsx'

const EditorContainer = () => {
  const { hideWorkingFiles, setHideWorkingFiles } = useAppContext()

  const [sizes, setSizes] = usePersistentSizes(EDITOR_CONTAINER_SPLIT_SIZES_STORAGE_KEY, EDITOR_CONTAINER_SPLIT_SIZES_DEFAULT)
  const minThreshold = 5

  const handleDrag = (newSizes: number[]) => {
    setHideWorkingFiles(false)
    setSizes(newSizes)
  }

  const handleDragEnd = (newSizes: number[]) => {
    const isWorkingFilesHidden = newSizes[0] < minThreshold
    setHideWorkingFiles(isWorkingFilesHidden)
    setSizes(isWorkingFilesHidden ? [0, 100] : newSizes)
  }

  const workingFilesClassName = clsx({
    'no-working-files': hideWorkingFiles,
    'warn-collapse': sizes[0] < minThreshold,
  })

  return (
    <Split className='split-component' sizes={sizes} minSize={EDITOR_CONTAINER_SPLIT_SIZES_MINIMUM} onDragEnd={handleDragEnd} onDrag={handleDrag}>
      <Box className={workingFilesClassName}>
        <EditorWorkingFiles />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <EditorWorkspacePreview />
      </Box>
    </Split>
  )
}
export default EditorContainer
