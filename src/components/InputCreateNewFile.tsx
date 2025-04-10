import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'

const InputCreateNewFile = () => {
  const [open, setOpen] = useState(false)
  const [fileName, setFileName] = useState('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleConfirm = () => {
    if (fileName.trim()) {
      console.log('File name:', fileName)
      setOpen(false)
    }
  }

  return (
    <>
      <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={handleOpen}>
        Create New File
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>
          Create New File
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
            label='File Name'
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

export default InputCreateNewFile
