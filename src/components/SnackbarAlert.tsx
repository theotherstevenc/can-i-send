import { Alert, Snackbar } from '@mui/material'
import { useContext } from 'react'
import { EditorContext } from '../context/EditorContext'

const SnackbarAlert = () => {
  const context = useContext(EditorContext)
  if (!context) throw new Error('useEditorContext must be used within an EditorProvider')

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
