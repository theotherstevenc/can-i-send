import { db } from '../firebase'
import { useState } from 'react'
import { deleteDoc, doc } from 'firebase/firestore'
import { useEditorContext } from '../context/EditorContext'
import { StyledIconButton } from './InputIconButton'
import { iconButtonStyles } from '../styles/global.styles'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material'
import { BTN_LABEL_CANCEL, BTN_LABEL_CONFIRM, BTN_LABEL_DELETE, BTN_LABEL_DELETE_CONFIRM, BTN_LABEL_DELETE_ERROR, DIALOG_CANNOT_BE_UNDONE, LABEL_CLOSE } from '../utils/constants'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'

const InputDeleteFile = () => {
  const { deletedWorkingFileID, workingFileID, setHtml, setText, setAmp, workingFileName, setDeletedWorkingFileID } = useEditorContext()
  const [open, setOpen] = useState(false)

  const COLLECTION = 'workingFiles'
  const DOCUMENT = workingFileID

  const handleOpen = () => {
    if (!workingFileID || workingFileID === deletedWorkingFileID) {
      return
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDeleteFile = async () => {
    if (!workingFileID) {
      return
    }

    try {
      const workingFiles = doc(db, COLLECTION, DOCUMENT)
      await deleteDoc(workingFiles)

      setHtml('')
      setText('')
      setAmp('')
      setDeletedWorkingFileID(workingFileID)
    } catch (error) {
      console.error(BTN_LABEL_DELETE_ERROR, error)
    }

    handleClose()
  }

  return (
    <>
      <Tooltip title={BTN_LABEL_DELETE}>
        <StyledIconButton onClick={handleOpen} aria-label={BTN_LABEL_DELETE}>
          <DeleteIcon />
        </StyledIconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {BTN_LABEL_DELETE_CONFIRM}
          <IconButton aria-label={LABEL_CLOSE} onClick={handleClose} sx={iconButtonStyles}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>{workingFileName}</strong> - {DIALOG_CANNOT_BE_UNDONE}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            {BTN_LABEL_CANCEL}
          </Button>
          <Button onClick={handleDeleteFile} color='primary' autoFocus>
            {BTN_LABEL_CONFIRM}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default InputDeleteFile
