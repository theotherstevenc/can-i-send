import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'
import { useEditorContext } from '../context/EditorContext'
import { StyledIconButton } from './InputIconButton'
import { BTN_LABEL_CANCEL, BTN_LABEL_OK, BTN_LABEL_UPDATE, BTN_LABEL_UPDATE_DIALOG, BTN_LABEL_UPDATE_FAILURE, LABEL_CLOSE } from '../utils/constants'
import { db } from '../firebase'
import { updateFirestoreDoc } from '../utils/updateFirestoreDoc'

const InputUpdateFiles = () => {
  const { deletedWorkingFileID, workingFileID, workingFileName, setWorkingFileName } = useEditorContext()
  const [open, setOpen] = useState(false)
  const [fileName, setFileName] = useState('')

  const handleOpen = () => {
    if (!workingFileID || workingFileID === deletedWorkingFileID) {
      return
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setFileName('')
  }

  const COLLECTION = 'workingFiles'
  const DOCUMENT = workingFileID
  const firestoreObj = { fileName }

  const handleConfirm = async () => {
    if (!workingFileID) return

    if (fileName.trim()) {
      try {
        await updateFirestoreDoc(db, COLLECTION, DOCUMENT, firestoreObj)
        setWorkingFileName(fileName)
        handleClose()
      } catch (error) {
        console.error(BTN_LABEL_UPDATE_FAILURE, error)
      }
    }
  }

  return (
    <>
      <Tooltip title={BTN_LABEL_UPDATE}>
        <StyledIconButton onClick={handleOpen} aria-label={BTN_LABEL_UPDATE}>
          <EditIcon />
        </StyledIconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>
          {BTN_LABEL_UPDATE}
          <IconButton
            aria-label={LABEL_CLOSE}
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label={BTN_LABEL_UPDATE_DIALOG}
            type='text'
            fullWidth
            value={fileName || workingFileName}
            onChange={(e) => {
              setFileName(e.target.value)
              setWorkingFileName(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleConfirm()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            {BTN_LABEL_CANCEL}
          </Button>
          <Button onClick={handleConfirm} color='primary'>
            {BTN_LABEL_OK}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default InputUpdateFiles
