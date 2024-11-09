import { Alert, Snackbar } from '@mui/material'

interface SnackbarAlertProps {
  alertState: {
    open: boolean
    severity: 'success' | 'error' | 'warning' | 'info'
    message: string
  }
  setAlertOpen: (open: boolean) => void
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({ alertState, setAlertOpen }) => {
  return (
    <Snackbar open={alertState.open} autoHideDuration={4000} onClose={() => setAlertOpen(false)}>
      <Alert onClose={() => setAlertOpen(false)} severity={alertState.severity}>
        {alertState.message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarAlert
