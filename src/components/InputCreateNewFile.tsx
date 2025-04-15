import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, FormControlLabel, Checkbox, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { boilerPlateMarkup } from '../utils/bolierpateMarkup'
import { useEditorContext } from '../context/EditorContext'
import { StyledIconButton } from './InputIconButton'

const InputCreateNewFile = () => {
  const { numberOfWorkingFiles, setNumberOfWorkingFiles, setWorkingFileID, setWorkingFileName } = useEditorContext()
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

        const responseData = await response.json()

        if (response.ok) {
          setFileName('')
          setWorkingFileID(responseData.id)
          setWorkingFileName(fileName)
          setOpen(false)
        } else {
          console.error('Error creating file:', responseData)
        }
      } catch (error) {
        console.error('Error:', error)
      }

      setNumberOfWorkingFiles(numberOfWorkingFiles + 1)
    }
  }

  return (
    <>
      <Tooltip title='Create New Project'>
        <StyledIconButton onClick={handleOpen} aria-label='Create New Project'>
          <AddIcon />
        </StyledIconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>
          Create New Project
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
          <FormControlLabel
            control={<Checkbox name='isBoilerplateApplied' color='primary' />}
            label='Apply placeholder boilerplates for html, text, amp'
            checked={isBoilerplateApplied}
            onChange={handleChange}
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
