import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { StyledIconButton } from './InputIconButton'
import { BTN_LABEL_LOGIN, BTN_LABEL_LOGOUT } from '../utils/constants'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import { Tooltip } from '@mui/material'
import usePersistentAuth from '../utils/usePersistentAuth'

export const Authenticator = () => {
  const loginEmail = ''
  const loginPassword = ''

  const [isAuth, setIsAuth] = usePersistentAuth('isLoggedIn', false)

  const auth = getAuth()

  const handleClick = async () => {
    if (isAuth) {
      try {
        await signOut(auth)
        setIsAuth(false)
        console.log('User signed out')
      } catch (error) {
        console.error('Error signing out:', error)
      }
    }

    if (!isAuth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        console.log('User signed in:', userCredential.user)
        setIsAuth(true)
      } catch (error) {
        console.error('Error signing in:', error)
      }
    }
  }

  const handleLoginButtonLabel = isAuth ? BTN_LABEL_LOGOUT : BTN_LABEL_LOGIN

  console.log('isAuth:', isAuth)

  return (
    <Tooltip title={handleLoginButtonLabel}>
      <StyledIconButton onClick={handleClick} aria-label={handleLoginButtonLabel}>
        {isAuth ? <LogoutIcon /> : <LoginIcon />}
      </StyledIconButton>
    </Tooltip>
  )
}
export default Authenticator
