/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Checkbox, FormControlLabel, TextField, Box, Button, Snackbar, Alert, AlertColor, Backdrop, CircularProgress, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { defaults } from './util/defaults'
import Split from 'react-split'
import Editor from '@monaco-editor/react'
import { TagsInput } from 'react-tag-input-component'
import { EDITOR_TYPE, EditorType, EmailData } from './util/types'

function App() {
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success')
  const [alertMessage, setAlertMessage] = useState<string>('')

  const [activeEditor, setActiveEditor] = useState<string>(EDITOR_TYPE.HTML)
  const [editorSizes, setEditorSizes] = useState<number[]>(JSON.parse(localStorage.getItem('editorSizes') || '[50, 50]'))
  const [sizes, setSizes] = useState<number[]>(JSON.parse(localStorage.getItem('sizes') || '[80, 20]'))

  const [email, setEmail] = useState<string[]>(JSON.parse(localStorage.getItem('email') || '["ex@abc.com", "ex@xyz.com"]'))
  const [subject, setSubject] = useState<string>(localStorage.getItem('subject') || '')
  const [html, setHtml] = useState<string>(defaults.html.trim())
  const [htmlCopy, setHtmlCopy] = useState<string>(defaults.html.trim())
  const [text, setText] = useState<string>(defaults.text.trim())
  const [amp, setAmp] = useState<string>(defaults.amp.trim())

  const [preventThreading, setPreventThreading] = useState<boolean>(false)
  const [minifyHTML, setMinifyHTML] = useState<boolean>(() => JSON.parse(localStorage.getItem('minifyHTML') || 'false'))
  const [wordWrap, setWordWrap] = useState<boolean>(() => JSON.parse(localStorage.getItem('wordWrap') || 'false'))

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

  useEffect(() => {
    localStorage.setItem('subject', subject)
    localStorage.setItem('editorSizes', JSON.stringify(editorSizes))
    localStorage.setItem('sizes', JSON.stringify(sizes))
    localStorage.setItem('email', JSON.stringify(email))
    localStorage.setItem('minifyHTML', JSON.stringify(minifyHTML))
    localStorage.setItem('wordWrap', JSON.stringify(wordWrap))
    localStorage.setItem('senderSettings', JSON.stringify(senderSettings))
  }, [subject, editorSizes, sizes, email, minifyHTML, wordWrap, senderSettings])

  useEffect(() => {
    if (minifyHTML) {
      setHtmlCopy(html)
      setHtml(customMinifyHtml(html))
    } else {
      setHtml(htmlCopy)
    }
  }, [minifyHTML])

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

  const handleError = (error: Error) => {
    setAlertMessage('An error occurred while processing your request.')
    setAlertSeverity('error')
    setAlertOpen(true)
    console.error(error)
  }

  const handleResponse = (response: Response) => {
    if (!response.ok) {
      setAlertMessage('Email not sent successfully')
      setAlertSeverity('error')
      setAlertOpen(true)
      throw new Error(`Error: ${response.statusText}`)
    }

    setAlertMessage('Email sent successfully')
    setAlertSeverity('success')
    setAlertOpen(true)
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

  const editors = [
    {
      type: EDITOR_TYPE.HTML,
      language: 'html',
      value: html,
      onChange: (newValue: string | undefined) => setHtml(newValue || ''),
    },
    {
      type: EDITOR_TYPE.TEXT,
      language: 'text',
      value: text,
      onChange: (newValue: string | undefined) => setText(newValue || ''),
    },
    {
      type: EDITOR_TYPE.AMP,
      language: 'html',
      value: amp,
      onChange: (newValue: string | undefined) => setAmp(newValue || ''),
    },
  ]

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
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      return data.encrypted
    } catch (error) {
      console.error('Error encrypting string:', error)
      return ''
    }
  }

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
    <div className='App'>
      <Snackbar open={alertOpen} autoHideDuration={4000} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <Backdrop open={loading} style={{ zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'InfoBackground', padding: '1rem 1rem 0 1rem', borderRadius: '.5rem' }}>
          <CircularProgress color='info' size='2.5rem' thickness={4} />
          <Typography variant='h2' color='textPrimary' style={{ marginTop: '0', padding: '1rem', fontSize: '1.5rem', fontWeight: 500 }}>
            Sending in Progress...
          </Typography>
        </Box>
      </Backdrop>

      <div className='editors'>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <FormControlLabel control={<Checkbox checked={minifyHTML} onChange={(e) => setMinifyHTML(e.target.checked)} name='minifyHTML' color='primary' />} label='Minify' />

            <FormControlLabel control={<Checkbox checked={wordWrap} onChange={(e) => setWordWrap(e.target.checked)} name='wordWrap' color='primary' />} label='Word wrap' />

            <FormControlLabel
              control={<Checkbox checked={preventThreading} onChange={(e) => setPreventThreading(e.target.checked)} name='preventThreading' color='primary' />}
              label='Prevent Threading'
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <TextField id='host' label='host' value={senderSettings.host} onChange={(e) => updateSenderSettings('host', e.target.value)} variant='outlined' size='small' />

            <TextField id='port' label='port' value={senderSettings.port} onChange={(e) => updateSenderSettings('port', e.target.value)} variant='outlined' size='small' />

            <TextField id='username' label='username' value={senderSettings.user} onChange={(e) => updateSenderSettings('user', e.target.value)} variant='outlined' size='small' />

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

            <TextField id='from' label='from' value={senderSettings.from} onChange={(e) => updateSenderSettings('from', e.target.value)} variant='outlined' size='small' />
          </Box>
          <Button component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon />}>
            Upload + Convert EML
            <VisuallyHiddenInput type='file' accept='.eml' onChange={(e) => handleFileUpload(e)} />
          </Button>
        </Box>
      </div>
      <div className='controls'>
        <div className='split-container'>
          <Box
            sx={{
              display: 'flex',
              gap: '.2rem',
            }}
          >
            <Button variant={activeEditor === EDITOR_TYPE.HTML ? 'outlined' : 'contained'} onClick={() => handleEditorChange(EDITOR_TYPE.HTML)}>
              html
            </Button>

            <Button variant={activeEditor === EDITOR_TYPE.TEXT ? 'outlined' : 'contained'} onClick={() => handleEditorChange(EDITOR_TYPE.TEXT)}>
              text
            </Button>

            <Button variant={activeEditor === EDITOR_TYPE.AMP ? 'outlined' : 'contained'} onClick={() => handleEditorChange(EDITOR_TYPE.AMP)}>
              amp
            </Button>

            <Box sx={{ flexGrow: 1 }}>
              <Split className='split' sizes={sizes} onDragEnd={(sizes) => setSizes(sizes)}>
                <TagsInput value={email} onChange={setEmail} />
                <TextField variant='outlined' label='subject line' value={subject} size='small' onChange={(e) => setSubject(e.target.value)} />
              </Split>
            </Box>

            <Button variant='contained' color='primary' onClick={() => sendEmail()}>
              Send Email
            </Button>
          </Box>
        </div>
      </div>
      <Split className='split' sizes={editorSizes} onDragEnd={(editorSizes) => setEditorSizes(editorSizes)}>
        <div className='workspace-editor'>
          {editors.map(
            (editor) =>
              activeEditor === editor.type && (
                <Editor
                  key={editor.type}
                  defaultLanguage={editor.language}
                  defaultValue={editor.value}
                  value={editor.value}
                  onChange={editor.onChange}
                  options={{
                    readOnly: minifyHTML,
                    wordWrap: wordWrap ? 'on' : 'off',
                    lineNumbers: 'on',
                    minimap: {
                      enabled: false,
                    },
                  }}
                />
              )
          )}
        </div>
        <div className='workspace-preview'>{editors.map((editor) => activeEditor === editor.type && <iframe key={editor.type} srcDoc={editor.value} />)}</div>
      </Split>
    </div>
  )
}

export default App
