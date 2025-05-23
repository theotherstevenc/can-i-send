import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useEditorContext } from '../context/EditorContext'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { BTN_LABEL_CANCEL, BTN_LABEL_LOGIN, BTN_LABEL_LOGOUT, BTN_LABEL_OK, LABEL_CLOSE } from '../utils/constants'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material'
import { StyledIconButton } from './InputIconButton'
import { iconButtonStyles } from '../styles/global.styles'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import CloseIcon from '@mui/icons-material/Close'

export const Authenticator = () => {
  const auth = getAuth()
  const { user } = useAppContext()
  const { setHtml, setText, setAmp, setWorkingFileID, setWorkingFileName, setFiles } = useEditorContext()

  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleOpen = () => {
    if (!user) {
      setOpen(true)
    }
    if (user) {
      handleLogout()
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setHtml('')
      setText('')
      setAmp('')
      setWorkingFileID('')
      setWorkingFileName('')
      setFiles([])
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, username, password)
      setOpen(false)
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const handleLoginButtonLabel = user ? BTN_LABEL_LOGOUT : BTN_LABEL_LOGIN

  return (
    <>
      <Tooltip title={handleLoginButtonLabel}>
        <StyledIconButton onClick={handleOpen} aria-label={handleLoginButtonLabel}>
          {user ? <LogoutIcon /> : <LoginIcon />}
        </StyledIconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>
          {BTN_LABEL_LOGIN}
          <IconButton aria-label={LABEL_CLOSE} onClick={handleClose} sx={iconButtonStyles}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='username'
            type='text'
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleLogin()
              }
            }}
          />
          <TextField
            margin='dense'
            label='password'
            type='password'
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleLogin()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            {BTN_LABEL_CANCEL}
          </Button>
          <Button onClick={handleLogin} color='primary'>
            {BTN_LABEL_OK}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default Authenticator
