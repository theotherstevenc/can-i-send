import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { useEditorContext } from '../context/EditorContext'
import { StyledIconButton } from './InputIconButton'

const InputDeleteFile = () => {
  const { workingFileID, numberOfWorkingFiles, setNumberOfWorkingFiles } = useEditorContext()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDeleteFile = async () => {
    if (!workingFileID) return
    setNumberOfWorkingFiles(numberOfWorkingFiles - 1)

    try {
      const response = await fetch('/api/delete-working-file', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workingFileID }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete file')
      }

      console.log('File deleted successfully')
    } catch (error) {
      console.error('Error deleting file:', error)
    } finally {
      handleClose()
    }
  }

  return (
    <>
      <StyledIconButton onClick={handleOpen} aria-label='Delete Project'>
        <DeleteIcon />
      </StyledIconButton>

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
          <DialogContentText>Are you sure you want to delete this project? This action cannot be undone.</DialogContentText>
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
