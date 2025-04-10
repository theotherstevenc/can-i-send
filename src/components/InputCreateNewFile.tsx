import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, FormControlLabel, Checkbox } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { boilerPlateMarkup } from '../utils/bolierpateMarkup'

const InputCreateNewFile = () => {
  const [open, setOpen] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isBoilerplateApplied, setIsBoilerplateApplied] = useState(false)

  const handleChange = (_event: React.SyntheticEvent, checked: boolean) => {
    setIsBoilerplateApplied(checked)
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleConfirm = async () => {
    if (fileName.trim()) {
      try {
        const requestBody: { fileName: string; boilerPlateMarkup?: string } = { fileName }

        if (isBoilerplateApplied) {
          requestBody.boilerPlateMarkup = JSON.stringify(boilerPlateMarkup)
        }

        const response = await fetch('/api/create-new-file', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })

        if (response.ok) {
          setFileName('')
          const data = await response.json()
          console.log('File created successfully:', data)
          setOpen(false)
        } else {
          const errorData = await response.json()
          console.error('Error creating file:', errorData)
        }
      } catch (error) {
        console.error('Error:', error)
      }
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
          <FormControlLabel control={<Checkbox name='isBoilerplateApplied' color='primary' />} label='Apply Boilerplates' checked={isBoilerplateApplied} onChange={handleChange} />
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
