import { Button } from '@mui/material'

interface EditorSendEmailButtonProps {
  sendEmail: () => void
}

const EditorSendEmailButton: React.FC<EditorSendEmailButtonProps> = ({ sendEmail }) => {
  return (
    <Button variant='contained' color='primary' onClick={() => sendEmail()}>
      Send Email
    </Button>
  )
}
export default EditorSendEmailButton
