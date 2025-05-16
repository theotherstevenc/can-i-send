/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button } from '@mui/material'
import { useEffect } from 'react'
import { WorkingFile } from '../interfaces'
import { useEditorContext } from '../context/EditorContext'
import { BTN_VARIANT_CONTAINED, BTN_VARIANT_OUTLINED, FETCH_ERROR } from '../utils/constants'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const EditorWorkingFiles = () => {
  const { setHtml, setText, setAmp, workingFileID, setWorkingFileID, setWorkingFileName, files, setFiles } = useEditorContext()

  const handleClick = (file: WorkingFile) => {
    setHtml(file.html)
    setText(file.text)
    setAmp(file.amp)
    setWorkingFileID(file.id)
    setWorkingFileName(file.fileName)
  }

  useEffect(() => {
    const workingFiles = collection(db, 'workingFiles')
    onSnapshot(
      workingFiles,
      (snapshot) => {
        const workingFilesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setFiles(workingFilesData as WorkingFile[])
      },
      (error) => {
        console.error(FETCH_ERROR, error)
      }
    )
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, padding: 0.5 }} className='editor-working-files'>
      {files.length > 0 &&
        files.map((file) => (
          <Button variant={workingFileID === file.id ? BTN_VARIANT_CONTAINED : BTN_VARIANT_OUTLINED} onClick={() => handleClick(file)} key={file.id}>
            {file.fileName}
          </Button>
        ))}
    </Box>
  )
}
export default EditorWorkingFiles
