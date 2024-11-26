import { Button } from '@mui/material'
import { EmailData } from '../types/types'
import useEditorContext from '../hooks/useEditorContext'

const API_URL = '/api/send'
const HTTP_METHOD_POST = 'POST'

const EditorSendEmailButton = () => {
  const { email, subject, html, text, amp, preventThreading, minifyHTML, senderSettings, setAlertState, setLoading } = useEditorContext()

  const handleRequest = async (emailData: EmailData): Promise<Response> => {
    const options: RequestInit = {
      method: HTTP_METHOD_POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    }
    const response = await fetch(API_URL, options)
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

  const getCurrentDateTime = (): string => {
    return new Date().toISOString().replace('T', ' ').split('.')[0]
  }

  const createEmailData = (
    email: string[],
    subject: string,
    html: string,
    text: string,
    amp: string,
    preventThreading: boolean,
    minifyHTML: boolean,
    senderSettings: any
  ): EmailData => {
    const currentDateTime = getCurrentDateTime()
    const formattedSubject = preventThreading ? `${subject} ${currentDateTime}` : subject
    const { host, port, user, pass, from } = senderSettings

    return {
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
  }

  const emailData = createEmailData(email, subject, html, text, amp, preventThreading, minifyHTML, senderSettings)

  const handleSend = async () => {
    setLoading(true)
    try {
      const response = await handleRequest(emailData)
      handleResponse(response)
    } catch (error) {
      handleError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant='contained' color='primary' onClick={() => handleSend()}>
      Send Email
    </Button>
  )
}
export default EditorSendEmailButton
