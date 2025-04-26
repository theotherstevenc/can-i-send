import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'
import { useEditorContext } from '../context/EditorContext'
import { StyledIconButton } from './InputIconButton'
import { updateStore } from '../utils/updateStore'

const InputUpdateFiles = () => {
  const { deletedWorkingFileID, workingFileID, workingFileName, setWorkingFileName, setTriggerFetch } = useEditorContext()
  const [open, setOpen] = useState(false)
  const [fileName, setFileName] = useState('')

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
  const ACTION = 'update'
  const firestoreObj = { fileName }

  const handleConfirm = async () => {
    if (!workingFileID) return

    if (fileName.trim()) {
      const response = await updateStore(COLLECTION, DOCUMENT, ACTION, API_URL, HTTP_METHOD, firestoreObj, setTriggerFetch)

      if (response.success) {
        setFileName('')
        setOpen(false)
      } else {
        console.error('Failed to update file:', response.message)
      }
    }
  }

  return (
    <>
      <Tooltip title='Rename Project'>
        <StyledIconButton onClick={handleOpen} aria-label='Rename Project'>
          <EditIcon />
        </StyledIconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>
          Rename Project
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
          <TextField
            autoFocus
            margin='dense'
            label='Project Name'
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
            Cancel
          </Button>
          <Button onClick={handleConfirm} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default InputUpdateFiles
