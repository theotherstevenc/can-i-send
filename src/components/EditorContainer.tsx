import { Box } from '@mui/material'
import EditorWorkspacePreview from './EditorWorkspacePreview'
import Split from 'react-split'
import EditorWorkingFiles from './EditorWorkingFiles'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'
import handleEditorResize from '../utils/handleEditorResize'

const EditorContainer = () => {
  const { hideWorkingFiles } = useAppContext()

  const [sidebarSizes, setSidebarSizes] = useState<number[]>(() => {
    const savedSizes = localStorage.getItem('sidebarSizes')
    return savedSizes ? JSON.parse(savedSizes) : [10, 90]
  })

  const className = hideWorkingFiles ? 'no-working-files' : ''
  return (
    <Split className='split-component' sizes={sidebarSizes} onDragEnd={(sizes) => handleEditorResize(sizes, 'sidebarSizes', setSidebarSizes)}>
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
