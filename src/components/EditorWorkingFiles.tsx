import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { WorkingFile } from '../interfaces'
import { useAppContext } from '../context/AppContext'

const EditorWorkingFiles = () => {
  const { setHtml, setText, setAmp } = useAppContext()

  const [files, setFiles] = useState<WorkingFile[]>([])

  const handleClick = (file: WorkingFile) => {
    setHtml(file.html)
    setText(file.text)
    setAmp(file.amp)
  }
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/get-firestore-working-files-collection?collection=workingFiles')
        if (!response.ok) {
          throw new Error('Failed to fetch files')
        }
        const data = await response.json()
        setFiles(data)
        console.log('Fetched files:', data)
      } catch (err) {
        console.error('Error fetching files:', err)
      }
    }

    fetchFiles()
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      {files.map((file) => (
        <Button variant='contained' onClick={() => handleClick(file)} key={file.id}>
          {file.fileName}
        </Button>
      ))}
    </Box>
  )
}
export default EditorWorkingFiles
