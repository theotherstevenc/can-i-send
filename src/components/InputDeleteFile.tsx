import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { useEditorContext } from '../context/EditorContext'
import { StyledIconButton } from './InputIconButton'
import { updateStore } from '../utils/updateStore'

const InputDeleteFile = () => {
  const { workingFileID, setWorkingFileID, setHtml, setText, setAmp, workingFileName, setWorkingFileName, setTriggerFetch } = useEditorContext()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    if (!workingFileID) {
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
        throw new Error('Failed to delete file')
      }

      setHtml('')
      setText('')
      setAmp('')
      setWorkingFileID('')
      setWorkingFileName('')
    } catch (error) {
      console.error('Error deleting file:', error)
    } finally {
      handleClose()
    }
  }

  return (
    <>
      <Tooltip title='Delete Project'>
        <StyledIconButton onClick={handleOpen} aria-label='Delete Project'>
          <DeleteIcon />
        </StyledIconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Confirm Delete
          <IconButton
            aria-label='close'
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
            Are you sure you want to delete <strong>{workingFileName}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleDeleteFile} color='primary' autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default InputDeleteFile
