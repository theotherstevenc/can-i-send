import { Alert, Snackbar } from '@mui/material'
import useEditorContext from '../helpers/useEditorContext'

const SnackbarAlert = () => {
  const { alertState, setAlertState } = useEditorContext()

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
