import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useEditorContext } from '../context/EditorContext'
import { boilerPlateMarkup } from '../utils/bolierpateMarkup'
import { StyledIconButton } from './InputIconButton'
import { createNewFile } from '../utils/createNewFile'
import { iconButtonStyles } from '../styles/global.styles'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, FormControlLabel, Checkbox, Tooltip } from '@mui/material'
import { BTN_LABEL_CANCEL, BTN_LABEL_CREATE, BTN_LABEL_CREATE_CHECKBOX, BTN_LABEL_CREATE_DIALOG, BTN_LABEL_CREATE_ERROR, BTN_LABEL_OK, LABEL_CLOSE } from '../utils/constants'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'

const InputCreateNewFile = () => {
  const { setIsMinifyEnabled, setIsWordWrapEnabled } = useAppContext()
  const { setWorkingFileID, setWorkingFileName, setHtml, setText, setAmp } = useEditorContext()
  const [open, setOpen] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isBoilerplateApplied, setIsBoilerplateApplied] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (_event: React.SyntheticEvent, checked: boolean) => {
    setIsBoilerplateApplied(checked)
  }

  const handleConfirm = async () => {
    setIsMinifyEnabled(false)
    setIsWordWrapEnabled(false)
    setWorkingFileID('')

    try {
      await createNewFile(fileName, boilerPlateMarkup, isBoilerplateApplied, setWorkingFileID, setWorkingFileName, setHtml, setText, setAmp)
      setFileName('')
      handleClose()
    } catch (error) {
      console.error(BTN_LABEL_CREATE_ERROR, error)
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
          <IconButton aria-label={LABEL_CLOSE} onClick={handleClose} sx={iconButtonStyles}>
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
