/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '../firebase'
import { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEditorContext } from '../context/EditorContext'
import { Box, Button } from '@mui/material'
import { WorkingFile } from '../interfaces'
import { logError } from '../utils/logError'
import LockIcon from '@mui/icons-material/Lock'
import { BTN_VARIANT_CONTAINED, BTN_VARIANT_OUTLINED } from '../utils/constants'

const EditorWorkingFiles = () => {
  const { setHtml, setText, setAmp, workingFileID, setWorkingFileID, setWorkingFileName, files, setFiles, setIsFileLocked } = useEditorContext()
  const { user } = useAppContext()

  const handleClick = (file: WorkingFile) => {
    setHtml(file.html)
    setText(file.text)
    setAmp(file.amp)
    setWorkingFileID(file.id)
    setWorkingFileName(file.fileName)
    setIsFileLocked(file.isFileLocked || false)
  }

  useEffect(() => {
    if (!user) return
    const workingFiles = collection(db, 'workingFiles')
    const unsubscribe = onSnapshot(
      workingFiles,
      (snapshot) => {
        const workingFilesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setFiles(workingFilesData as WorkingFile[])
      },
      (error) => {
        logError('An error occurred while fetching working files', 'EditorWorkingFiles', error)
      }
    )
    return () => unsubscribe()
  }, [user])

  useEffect(() => {
    const currentFile = files.find((file) => file.id === workingFileID)
    setIsFileLocked(currentFile?.isFileLocked || false)
  }, [files])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, padding: 0.5 }} className='editor-working-files'>
      {files.length > 0 &&
        files.map((file) => (
          <Button
            variant={workingFileID === file.id ? BTN_VARIANT_CONTAINED : BTN_VARIANT_OUTLINED}
            onClick={() => handleClick(file)}
            key={file.id}
            sx={{ justifyContent: 'flex-start', position: 'relative', paddingLeft: 4, paddingRight: 4 }}>
            {file.isFileLocked && (
              <Box
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                }}>
                <LockIcon fontSize='inherit' sx={{ fontSize: 12 }} />
              </Box>
            )}
            <Box sx={{ width: '100%', textAlign: 'center' }}>{file.fileName}</Box>
          </Button>
        ))}
    </Box>
  )
}
export default EditorWorkingFiles
