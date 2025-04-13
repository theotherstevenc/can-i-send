/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { WorkingFile } from '../interfaces'
import { useEditorContext } from '../context/EditorContext'

const BUTTON_VARIANT_OUTLINED = 'outlined'
const BUTTON_VARIANT_CONTAINED = 'contained'

const EditorWorkingFiles = () => {
  const { setHtml, setText, setAmp, workingFileID, setWorkingFileID, numberOfWorkingFiles, setNumberOfWorkingFiles, setWorkingFileName } = useEditorContext()

  const [files, setFiles] = useState<WorkingFile[]>([])

  const fetchFiles = async () => {
    const API_URL = '/api/get-collection'
    const HTTP_METHOD_POST = 'POST'
    const COLLECTION = 'workingFiles'

    try {
      const response = await fetch(API_URL, {
        method: HTTP_METHOD_POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          COLLECTION,
        }),
      })
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
    // TODO: review to this fetch
    // it was created to ensure the file is up to date
    // it may be causing performance issues
    await fetchFiles()
    setHtml(file.html)
    setText(file.text)
    setAmp(file.amp)
    setWorkingFileID(file.id)
    setWorkingFileName(file.fileName)
  }
  useEffect(() => {
    fetchFiles()
  }, [numberOfWorkingFiles])
  // TODO: refactor this dependency array logic.
  // it does not need to be number of working files.
  // it is an arbitrary value that triggers a refetch/rerender.

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, padding: 0.5 }}>
      {files.map((file) => (
        <Button variant={workingFileID === file.id ? BUTTON_VARIANT_CONTAINED : BUTTON_VARIANT_OUTLINED} onClick={() => handleClick(file)} key={file.id}>
          {file.fileName}
        </Button>
      ))}
    </Box>
  )
}
export default EditorWorkingFiles
