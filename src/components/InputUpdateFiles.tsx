import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'
import { useEditorContext } from '../context/EditorContext'
import { StyledIconButton } from './InputIconButton'

const InputUpdateFiles = () => {
  const { workingFileID, setNumberOfWorkingFiles, numberOfWorkingFiles } = useEditorContext()
  const [open, setOpen] = useState(false)
  const [fileName, setFileName] = useState('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleConfirm = async () => {
    if (!workingFileID) return
    setNumberOfWorkingFiles(numberOfWorkingFiles + 1)

    if (fileName.trim()) {
      try {
        const response = await fetch('/api/update-working-file-name', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileName, workingFileID }),
        })

        if (response.ok) {
          setFileName('')
          setOpen(false)
        } else {
          const errorData = await response.json()
          console.error('Error updating file:', errorData)
        }
      } catch (error) {
        console.error('Error:', error)
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
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
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
