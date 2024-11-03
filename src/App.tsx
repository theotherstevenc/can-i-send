import './App.css'
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { TextField, Box, Button, Checkbox, FormControlLabel } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { defaults } from './util/defaults'
import { EDITOR_TYPE, EditorType, EmailData } from './util/types'
import { getEditorsConfig } from './util/editorsConfig'
import SnackbarAlert from './components/SnackbarAlert'
import BackdropProgress from './components/BackdropProgress'
import WorkspaceEditorPreview from './components/WorkspaceEditorPreview'
import EditorSelectorButtons from './components/EditorSelectorButtons'
import EditorEmailListInput from './components/EditorEmailListInput'
import EditorSendEmailButton from './components/EditorSendEmailButton'
import { boxAppStyles, boxContentSettingsStyles, boxControlStyles, boxCustomSettingsStyles, boxSenderSettingsStyles } from './util/styles'

function App() {
  const [activeEditor, setActiveEditor] = useState<string>(localStorage.getItem('editor') || EDITOR_TYPE.HTML)
  const [editorSizes, setEditorSizes] = useState<number[]>(JSON.parse(localStorage.getItem('editorSizes') || '[50, 50]'))
  const [sizes, setSizes] = useState<number[]>(JSON.parse(localStorage.getItem('sizes') || '[80, 20]'))

  const [email, setEmail] = useState<string[]>(JSON.parse(localStorage.getItem('email') || '["ex@abc.com", "ex@xyz.com"]'))
  const [subject, setSubject] = useState<string>(localStorage.getItem('subject') || '')
  const [originalHtml, setOriginalHtml] = useState<string>(localStorage.getItem('originalHtml') || '')
  const [html, setHtml] = useState<string>(localStorage.getItem('html') || defaults.html.trim())
  const [text, setText] = useState<string>(localStorage.getItem('text') || defaults.text.trim())
  const [amp, setAmp] = useState<string>(localStorage.getItem('amp') || defaults.amp.trim())

  const [preventThreading, setPreventThreading] = useState<boolean>(JSON.parse(localStorage.getItem('preventThreading') || 'false'))
  const [minifyHTML, setMinifyHTML] = useState<boolean>(() => JSON.parse(localStorage.getItem('minifyHTML') || 'false'))
  const [wordWrap, setWordWrap] = useState<boolean>(() => JSON.parse(localStorage.getItem('wordWrap') || 'false'))

  const [loading, setLoading] = useState<boolean>(false)

  const [alertState, setAlertState] = useState({
    message: '',
    severity: 'success' as 'error' | 'success',
    open: false,
  })

  const localSenderSettings = JSON.parse(localStorage.getItem('senderSettings') || '{}')
  const [senderSettings, setSenderSettings] = useState({
    host: localSenderSettings.host || '',
    port: localSenderSettings.port || '',
    user: localSenderSettings.user || '',
    pass: localSenderSettings.pass || '',
    from: localSenderSettings.from || '',
  })

  const updateSenderSettings = (key: string, value: string) => {
    setSenderSettings((prevSettings) => {
      return { ...prevSettings, [key]: value }
    })
  }

  const customMinifyHtml = (html: string): string => {
    return html
      .replace(/<!--\[if mso\]>[\s\S]*?<!\[endif\]-->/g, (match) => {
        return match.replace(/\n\s*/g, '') // Remove newlines and leading whitespace within the conditional comments
      })
      .replace(/\n\s*/g, '') // Remove newlines and leading whitespace
      .replace(/>\s+</g, '><') // Remove whitespace between tags
      .replace(/<!--(?!\[if mso\]).*?-->/g, '') // Remove comments except conditional comments
  }

  const handleMinifyHTML = (minify: boolean) => {
    setMinifyHTML(minify)
    if (minify) {
      setOriginalHtml(html)
      localStorage.setItem('originalHtml', html)
      setHtml(customMinifyHtml(html))
    } else {
      setHtml(localStorage.getItem('originalHtml') || originalHtml)
    }
  }

  useEffect(() => {
    localStorage.setItem('html', html)
    localStorage.setItem('text', text)
    localStorage.setItem('amp', amp)
    localStorage.setItem('editor', activeEditor)
    localStorage.setItem('subject', subject)
    localStorage.setItem('editorSizes', JSON.stringify(editorSizes))
    localStorage.setItem('sizes', JSON.stringify(sizes))
    localStorage.setItem('email', JSON.stringify(email))
    localStorage.setItem('minifyHTML', JSON.stringify(minifyHTML))
    localStorage.setItem('wordWrap', JSON.stringify(wordWrap))
    localStorage.setItem('preventThreading', JSON.stringify(preventThreading))
    localStorage.setItem('senderSettings', JSON.stringify(senderSettings))
  }, [html, text, amp, subject, editorSizes, sizes, email, minifyHTML, wordWrap, senderSettings, preventThreading, activeEditor])

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

  const setAlertOpen = (open: boolean) => {
    setAlertState({
      ...alertState,
      open,
    })
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

    try {
      const response = await sendEmailRequest(emailData)
      handleResponse(response)
    } catch (error) {
      handleError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditorChange = (editor: EditorType) => {
    setActiveEditor(editor)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      const url = '/api/upload'
      const options = {
        method: 'POST',
        body: formData,
      }

      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const text = await response.text()
      if (!text) {
        throw new Error('Empty response body')
      }

      const data = JSON.parse(text)

      setHtml(data.html)
      setText(data.text)
      setAmp(data.amp)
    }
  }

  const encryptString = async (text: string): Promise<string> => {
    if (!text) return ''
    try {
      const response = await fetch('/api/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }

      const data = await response.json()
      return data.encrypted
    } catch (error) {
      console.error('Error encrypting string:', error)
      return ''
    }
  }

  const editors = getEditorsConfig(html, setHtml, text, setText, amp, setAmp)

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  return (
    <Box sx={boxAppStyles}>
      <SnackbarAlert alertState={alertState} setAlertOpen={setAlertOpen} />
      <BackdropProgress loading={loading} />

      <Box sx={boxContentSettingsStyles}>
        <Box sx={boxCustomSettingsStyles}>
          <FormControlLabel
            control={<Checkbox checked={minifyHTML} onChange={(e) => handleMinifyHTML(e.target.checked)} name='minifyHTML' color='primary' />}
            label='Minify'
          />

          <FormControlLabel
            control={<Checkbox checked={wordWrap} onChange={(e) => setWordWrap(e.target.checked)} name='wordWrap' color='primary' />}
            label='Word wrap'
          />

          <FormControlLabel
            control={
              <Checkbox checked={preventThreading} onChange={(e) => setPreventThreading(e.target.checked)} name='preventThreading' color='primary' />
            }
            label='Prevent Threading'
          />
        </Box>
        <Box sx={boxSenderSettingsStyles}>
          <TextField
            id='host'
            label='host'
            value={senderSettings.host}
            onChange={(e) => updateSenderSettings('host', e.target.value)}
            variant='outlined'
            size='small'
          />

          <TextField
            id='port'
            label='port'
            value={senderSettings.port}
            onChange={(e) => updateSenderSettings('port', e.target.value)}
            variant='outlined'
            size='small'
          />

          <TextField
            id='username'
            label='username'
            value={senderSettings.user}
            onChange={(e) => updateSenderSettings('user', e.target.value)}
            variant='outlined'
            size='small'
          />

          <TextField
            id='pass'
            label='password'
            type='password'
            value={senderSettings.pass}
            onChange={(e) => updateSenderSettings('pass', e.target.value)}
            onBlur={async (e) => updateSenderSettings('pass', await encryptString(e.target.value))}
            variant='outlined'
            size='small'
          />

          <TextField
            id='from'
            label='from'
            value={senderSettings.from}
            onChange={(e) => updateSenderSettings('from', e.target.value)}
            variant='outlined'
            size='small'
          />
        </Box>
        <Button component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon />}>
          Upload + Convert EML
          <VisuallyHiddenInput type='file' accept='.eml' onChange={(e) => handleFileUpload(e)} />
        </Button>
      </Box>

      <Box sx={boxControlStyles}>
        <EditorSelectorButtons activeEditor={activeEditor} handleEditorChange={handleEditorChange} />
        <EditorEmailListInput sizes={sizes} setSizes={setSizes} email={email} setEmail={setEmail} subject={subject} setSubject={setSubject} />
        <EditorSendEmailButton sendEmail={sendEmail} />
      </Box>

      <WorkspaceEditorPreview
        editorSizes={editorSizes}
        setEditorSizes={setEditorSizes}
        editors={editors}
        activeEditor={activeEditor}
        minifyHTML={minifyHTML}
        wordWrap={wordWrap}
      />
    </Box>
  )
}

export default App
