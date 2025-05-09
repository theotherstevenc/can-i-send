import { Alert, Backdrop, Button, CircularProgress, Snackbar } from '@mui/material'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'
import { EmailData, SenderSettings } from '../interfaces'
import { getCurrentDateTime } from '../utils/getCurrentDateTime'
import { useEditorContext } from '../context/EditorContext'
import { BTN_LABEL_SEND, FETCH_ERROR, SEND_ALERT_FAILURE, SEND_ALERT_SUCCESS } from '../utils/constants'

const EditorSendButton = () => {
  const { html, text, amp } = useEditorContext()
  const { isPreventThreadingEnabled, subject, emailAddresses, inputSenderSettings } = useAppContext()
  const [open, setOpen] = useState(false)
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [isSendSuccessful, setIsSendSuccessful] = useState(true)

  const createEmailData = (email: string[], subject: string, html: string, text: string, amp: string, isPreventThreadingEnabled: boolean, senderSettings: SenderSettings): EmailData => {
    const currentDateTime = getCurrentDateTime()
    const formattedSubject = isPreventThreadingEnabled ? `${subject} ${currentDateTime}` : subject
    const { host, port, username, pass, from } = senderSettings

    return {
      testaddress: email,
      testsubject: formattedSubject,
      htmlversion: html,
      textversion: text,
      ampversion: amp,
      host,
      port,
      username,
      pass,
      from,
    }
  }

  const emailData = createEmailData(emailAddresses, subject, html, text, amp, isPreventThreadingEnabled, inputSenderSettings)

  const API_URL = '/api/send'
  const HTTP_METHOD = 'POST'

  const handleRequest = async (emailData: EmailData): Promise<Response> => {
    const options: RequestInit = {
      method: HTTP_METHOD,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    }
    const response = await fetch(API_URL, options)
    return response
  }

  const handleResponse = (response: Response) => {
    if (!response.ok || response.status !== 200) {
      throw new Error(FETCH_ERROR + response.statusText)
    }
    setIsSendSuccessful(true)
  }

  // refactor to improve readability?
  const handleClick = async () => {
    setOpenBackdrop(true)

    try {
      const response = await handleRequest(emailData)
      handleResponse(response)
    } catch (error) {
      console.error(FETCH_ERROR + error)
      setIsSendSuccessful(false)
    } finally {
      setOpenBackdrop(false)
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant='contained' color='primary' onClick={handleClick}>
        {BTN_LABEL_SEND}
      </Button>

      <Backdrop sx={(theme) => ({ color: '#ffffff', zIndex: theme.zIndex.drawer + 1 })} open={openBackdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert severity={isSendSuccessful ? 'success' : 'error'} variant='standard' sx={{ width: '100%' }}>
          {isSendSuccessful ? SEND_ALERT_SUCCESS : SEND_ALERT_FAILURE}
        </Alert>
      </Snackbar>
    </>
  )
}
export default EditorSendButton
