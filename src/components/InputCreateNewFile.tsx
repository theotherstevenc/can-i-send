import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, FormControlLabel, Checkbox, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { boilerPlateMarkup } from '../utils/bolierpateMarkup'
import { useEditorContext } from '../context/EditorContext'
import { StyledIconButton } from './InputIconButton'
import { useAppContext } from '../context/AppContext'
import { createNewFile } from '../utils/createNewFile'
import { BTN_LABEL_CANCEL, BTN_LABEL_CREATE, BTN_LABEL_CREATE_CHECKBOX, BTN_LABEL_CREATE_DIALOG, BTN_LABEL_OK, LABEL_CLOSE } from '../utils/constants'

const InputCreateNewFile = () => {
  const { setIsMinifyEnabled, setIsWordWrapEnabled } = useAppContext()
  const { setWorkingFileID, setWorkingFileName, setHtml, setText, setAmp } = useEditorContext()
  const [open, setOpen] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isBoilerplateApplied, setIsBoilerplateApplied] = useState(false)

  const handleChange = (_event: React.SyntheticEvent, checked: boolean) => {
    setIsBoilerplateApplied(checked)
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleConfirm = async () => {
    setIsMinifyEnabled(false)
    setIsWordWrapEnabled(false)
    setWorkingFileID('')

    if (fileName.trim()) {
      await createNewFile(fileName, boilerPlateMarkup, isBoilerplateApplied, setWorkingFileID, setWorkingFileName, setHtml, setText, setAmp)
      setFileName('')
      handleClose()
    }
  }

  return (
    <>
      <Tooltip title={BTN_LABEL_CREATE}>
        <StyledIconButton onClick={handleOpen} aria-label={BTN_LABEL_CREATE}>
          <AddIcon />
        </StyledIconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>
          {BTN_LABEL_CREATE}
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
            label={BTN_LABEL_CREATE_DIALOG}
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
          <FormControlLabel control={<Checkbox name='isBoilerplateApplied' color='primary' />} label={BTN_LABEL_CREATE_CHECKBOX} checked={isBoilerplateApplied} onChange={handleChange} />
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

export default InputCreateNewFile
