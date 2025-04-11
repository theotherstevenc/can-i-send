/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { WorkingFile } from '../interfaces'
import { useEditorContext } from '../context/EditorContext'

const BUTTON_VARIANT_OUTLINED = 'outlined'
const BUTTON_VARIANT_CONTAINED = 'contained'

const EditorWorkingFiles = () => {
  const { setHtml, setText, setAmp, workingFileID, setWorkingFileID, numberOfWorkingFiles, setNumberOfWorkingFiles } = useEditorContext()

  const [files, setFiles] = useState<WorkingFile[]>([])

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/get-firestore-working-files-collection?collection=workingFiles')
      if (!response.ok) {
        throw new Error('Failed to fetch files')
      }
      const data = await response.json()
      setFiles(data)
      setNumberOfWorkingFiles(data.length)
    } catch (err) {
      console.error('Error fetching files:', err)
    }
  }

  const handleClick = async (file: WorkingFile) => {
    await fetchFiles()
    setHtml(file.html)
    setText(file.text)
    setAmp(file.amp)
    setWorkingFileID(file.id)
  }
  useEffect(() => {
    fetchFiles()
  }, [numberOfWorkingFiles])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      {files.map((file) => (
        <Button variant={workingFileID === file.id ? BUTTON_VARIANT_CONTAINED : BUTTON_VARIANT_OUTLINED} onClick={() => handleClick(file)} key={file.id}>
          {file.fileName}
        </Button>
      ))}
    </Box>
  )
}
export default EditorWorkingFiles
