import { Button } from '@mui/material'
import { EmailData } from '../util/types'
import { useContext } from 'react'
import { EditorContext } from '../context/EditorContext'

const EditorSendEmailButton = () => {
  const context = useContext(EditorContext)

  if (!context) throw new Error('useEditorContext must be used within an EditorProvider')

  const { email, subject, html, text, amp, preventThreading, minifyHTML, senderSettings, setAlertState, setLoading } = context

  const sendEmailRequest = async (emailData: EmailData) => {
    const url = '/api/send'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    }
    const response = await fetch(url, options)
    return response
  }

  const handleAlert = (message: string, severity: 'error' | 'success', error?: Error) => {
    setAlertState({
      message,
      severity,
      open: true,
    })
    if (error) console.error(error)
  }

  const handleError = (error: Error) => {
    handleAlert('An error occurred while processing your request.', 'error', error)
  }

  const handleResponse = (response: Response) => {
    if (!response.ok) {
      handleAlert('Email not sent successfully', 'error')
      throw new Error('Error: ' + response.statusText)
    }
    handleAlert('Email sent successfully!', 'success')
  }

  const sendEmail = async () => {
    setLoading(true)
    const currentDateTime = new Date().toISOString().replace('T', ' ').split('.')[0]
    const formattedSubject = preventThreading ? `${subject} ${currentDateTime}` : subject
    const { host, port, user, pass, from } = senderSettings

    const emailData = {
      testaddress: email,
      testsubject: formattedSubject,
      htmlversion: html,
      textversion: text,
      ampversion: amp,
      preventThreading,
      minifyHTML,
      host,
      port,
      user,
      pass,
      from,
    }

    console.log(emailData)

    try {
      const response = await sendEmailRequest(emailData)
      handleResponse(response)
    } catch (error) {
      handleError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant='contained' color='primary' onClick={() => sendEmail()}>
      Send Email
    </Button>
  )
}
export default EditorSendEmailButton
