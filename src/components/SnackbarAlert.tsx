import { Alert, Snackbar } from '@mui/material'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const SnackbarAlert = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useContext must be inside a Provider with a value')
  }

  const { alertState, setAlertState } = context

  const setAlertOpen = (open: boolean) => {
    setAlertState({
      ...alertState,
      open,
    })
  }

  return (
    <Snackbar open={alertState.open} autoHideDuration={4000} onClose={() => setAlertOpen(false)}>
      <Alert onClose={() => setAlertOpen(false)} severity={alertState.severity}>
        {alertState.message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarAlert
