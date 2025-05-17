import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { StyledIconButton } from './InputIconButton'
import { BTN_LABEL_CANCEL, BTN_LABEL_LOGIN, BTN_LABEL_LOGOUT, BTN_LABEL_OK, LABEL_CLOSE } from '../utils/constants'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import usePersistentAuth from '../utils/usePersistentAuth'
import { useState } from 'react'

export const Authenticator = () => {
  const auth = getAuth()

  const [isAuth, setIsAuth] = usePersistentAuth('isLoggedIn', false)
  const [open, setOpen] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleOpen = () => {
    if (!isAuth) {
      setOpen(true)
    }
    if (isAuth) {
      handleLogout()
    }
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setIsAuth(false)
      console.log('User signed out')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password)
      console.log('User signed in:', userCredential.user)
      setIsAuth(true)
      setOpen(false)
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const handleLoginButtonLabel = isAuth ? BTN_LABEL_LOGOUT : BTN_LABEL_LOGIN

  console.log('isAuth:', isAuth)

  return (
    <>
      <Tooltip title={handleLoginButtonLabel}>
        <StyledIconButton onClick={handleOpen} aria-label={handleLoginButtonLabel}>
          {isAuth ? <LogoutIcon /> : <LoginIcon />}
        </StyledIconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>
          {BTN_LABEL_LOGIN}
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
