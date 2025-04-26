/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button } from '@mui/material'
import { useEffect } from 'react'
import { WorkingFile } from '../interfaces'
import { useEditorContext } from '../context/EditorContext'

const BUTTON_VARIANT_OUTLINED = 'outlined'
const BUTTON_VARIANT_CONTAINED = 'contained'

const EditorWorkingFiles = () => {
  const { setHtml, setText, setAmp, workingFileID, setWorkingFileID, setWorkingFileName, triggerFetch, files, setFiles } = useEditorContext()

  const API_URL = '/api/get-collection'
  const HTTP_METHOD = 'POST'
  const COLLECTION = 'workingFiles'

  const fetchFiles = async () => {
    try {
      const response = await fetch(API_URL, {
        method: HTTP_METHOD,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          COLLECTION,
        }),
      })

      const data = await response.json()

      setFiles(data)
    } catch (err) {
      console.error('Error fetching files:', err)
    }
  }

  const handleClick = (file: WorkingFile) => {
    setHtml(file.html)
    setText(file.text)
    setAmp(file.amp)
    setWorkingFileID(file.id)
    setWorkingFileName(file.fileName)
  }

  useEffect(() => {
    fetchFiles()
  }, [triggerFetch])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, padding: 0.5 }}>
      {files.length > 0 &&
        files.map((file) => (
          <Button variant={workingFileID === file.id ? BUTTON_VARIANT_CONTAINED : BUTTON_VARIANT_OUTLINED} onClick={() => handleClick(file)} key={file.id}>
            {file.fileName}
          </Button>
        ))}
    </Box>
  )
}
export default EditorWorkingFiles
