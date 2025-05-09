import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { useEditorContext } from '../context/EditorContext'
import { StyledIconButton } from './InputIconButton'
import { updateStore } from '../utils/updateStore'
import {
  BTN_LABEL_CANCEL,
  BTN_LABEL_CONFIRM,
  BTN_LABEL_DELETE,
  BTN_LABEL_DELETE_CONFIRM,
  BTN_LABEL_DELETE_ERROR,
  BTN_LABEL_DELETE_FAILURE,
  DIALOG_CANNOT_BE_UNDONE,
  LABEL_CLOSE,
} from '../utils/constants'

const InputDeleteFile = () => {
  const { deletedWorkingFileID, workingFileID, setHtml, setText, setAmp, workingFileName, setDeletedWorkingFileID, setTriggerFetch } = useEditorContext()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    if (!workingFileID || workingFileID === deletedWorkingFileID) {
      return
    }
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const API_URL = '/api/update-editor'
  const HTTP_METHOD = 'POST'
  const COLLECTION = 'workingFiles'
  const DOCUMENT = workingFileID
  const ACTION = 'delete'

  const handleDeleteFile = async () => {
    if (!workingFileID) {
      return
    }

    try {
      const response = await updateStore(COLLECTION, DOCUMENT, ACTION, API_URL, HTTP_METHOD, undefined, setTriggerFetch)

      if (!response.success) {
        throw new Error(BTN_LABEL_DELETE_FAILURE)
      }

      setHtml('')
      setText('')
      setAmp('')
      setDeletedWorkingFileID(workingFileID)
    } catch (error) {
      console.error(BTN_LABEL_DELETE_ERROR, error)
    } finally {
      handleClose()
    }
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
