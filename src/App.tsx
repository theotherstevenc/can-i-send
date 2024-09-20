/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Checkbox, FormControlLabel, TextField, Box, Button, Snackbar, Alert, AlertColor } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { defaults } from './util/defaults'
import Split from 'react-split'
import Editor from '@monaco-editor/react'
import { TagsInput } from 'react-tag-input-component'

enum EDITOR_TYPE {
  HTML = 'html',
  TEXT = 'text',
  AMP = 'amp',
}

type EmailData = {
  testaddress: string[]
  testsubject: string
  htmlversion: string
  textversion: string
  ampversion: string
  preventThreading: boolean
  minifyHTML: boolean
  host: string
  port: string
  user: string
  pass: string
  from: string
}

function App() {
  // Alert state
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success')
  const [alertMessage, setAlertMessage] = useState<string>('')

  // Editor state
  const [activeEditor, setActiveEditor] = useState<string>(EDITOR_TYPE.HTML)
  const [editorSizes, setEditorSizes] = useState<number[]>(JSON.parse(localStorage.getItem('editorSizes') || '[50, 50]'))

  // Email content state
  const [email, setEmail] = useState<string[]>(JSON.parse(localStorage.getItem('email') || '["ex@abc.com", "ex@xyz.com"]'))
  const [subject, setSubject] = useState<string>(localStorage.getItem('subject') || '')
  const [html, setHtml] = useState<string>(defaults.html.trim())
  const [htmlCopy, setHtmlCopy] = useState<string>(defaults.html.trim())
  const [text, setText] = useState<string>(defaults.text.trim())
  const [amp, setAmp] = useState<string>(defaults.amp.trim())

  // Email settings state
  const [preventThreading, setPreventThreading] = useState<boolean>(false)
  const [minifyHTML, setMinifyHTML] = useState<boolean>(() => JSON.parse(localStorage.getItem('minifyHTML') || 'false'))
  const [wordWrap, setWordWrap] = useState<boolean>(() => JSON.parse(localStorage.getItem('wordWrap') || 'false'))

  // Server configuration state
  const [host, setHost] = useState(localStorage.getItem('host') || '')
  const [port, setPort] = useState(localStorage.getItem('port') || '')
  const [user, setUser] = useState(localStorage.getItem('user') || '')
  const [pass, setPass] = useState(localStorage.getItem('pass') || '')
  const [from, setFrom] = useState(localStorage.getItem('from') || '')

  // Layout state
  const [sizes, setSizes] = useState<number[]>(JSON.parse(localStorage.getItem('sizes') || '[80, 20]'))

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
    localStorage.setItem('host', host)
    localStorage.setItem('port', port)
    localStorage.setItem('user', user)
    localStorage.setItem('pass', pass)
    localStorage.setItem('from', from)
  }, [subject, editorSizes, sizes, email, minifyHTML, wordWrap, host, port, user, pass, from])

  useEffect(() => {
    if (minifyHTML) {
      setHtmlCopy(html)
      setHtml(customMinifyHtml(html))
    } else {
      setHtml(htmlCopy)
    }
  }, [minifyHTML])

  const sendEmailRequest = async (emailData: EmailData) => {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })
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
    const currentDateTime = new Date().toISOString().replace('T', ' ').split('.')[0]
    const formattedSubject = preventThreading ? `${subject} ${currentDateTime}` : subject

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

  const handleEditorChange = (editor: EDITOR_TYPE) => {
    setActiveEditor(editor)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      const url = 'http://localhost:8080/api/upload'
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
            <TextField id='host' label='host' value={host} onChange={(e) => setHost(e.target.value)} variant='outlined' size='small' />

            <TextField id='port' label='port' value={port} onChange={(e) => setPort(e.target.value)} variant='outlined' size='small' />

            <TextField id='username' label='username' value={user} onChange={(e) => setUser(e.target.value)} variant='outlined' size='small' />

            <TextField id='pass' label='password' type='password' value={pass} onChange={(e) => setPass(e.target.value)} variant='outlined' size='small' />

            <TextField id='from' label='from' value={from} onChange={(e) => setFrom(e.target.value)} variant='outlined' size='small' />
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
