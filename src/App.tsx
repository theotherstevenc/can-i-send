/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Checkbox, FormControlLabel, TextField, Box, Button } from '@mui/material'
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

function App() {
  const [activeEditor, setActiveEditor] = useState<string>(EDITOR_TYPE.HTML)
  const [email, setEmail] = useState<string[]>(
    JSON.parse(localStorage.getItem('email') || '["ex@abc.com", "ex@xyz.com"]')
  )
  const [subject, setSubject] = useState(localStorage.getItem('subject') || '')
  const [html, setHtml] = useState<string>(defaults.html.trim())
  const [htmlCopy, setHtmlCopy] = useState<string>(defaults.html.trim())
  const [text, setText] = useState<string>(defaults.text.trim())
  const [amp, setAmp] = useState<string>(defaults.amp.trim())
  const [preventThreading, setPreventThreading] = useState(false)
  const [minifyHTML, setMinifyHTML] = useState(() =>
    JSON.parse(localStorage.getItem('minifyHTML') || 'false')
  )
  const [wordWrap, setWordWrap] = useState(() =>
    JSON.parse(localStorage.getItem('wordWrap') || 'false')
  )
  const [host, setHost] = useState(localStorage.getItem('host') || '')
  const [port, setPort] = useState(localStorage.getItem('port') || '')
  const [username, setUsername] = useState(localStorage.getItem('username') || '')
  const [password, setPassword] = useState(localStorage.getItem('password') || '')
  const [from, setFrom] = useState(localStorage.getItem('from') || '')
  const [sizes, setSizes] = useState<number[]>(
    JSON.parse(localStorage.getItem('sizes') || '[80, 20]')
  )
  const [editorSizes, setEditorSizes] = useState<number[]>(
    JSON.parse(localStorage.getItem('editorSizes') || '[50, 50]')
  )

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
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    localStorage.setItem('from', from)
  }, [
    subject,
    editorSizes,
    sizes,
    email,
    minifyHTML,
    wordWrap,
    host,
    port,
    username,
    password,
    from,
  ])

  useEffect(() => {
    if (minifyHTML) {
      setHtmlCopy(html)
      setHtml(customMinifyHtml(html))
    } else {
      setHtml(htmlCopy)
    }
  }, [minifyHTML])

  const sendEmail = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8080/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testaddress: email,
          testsubject: subject,
          htmlversion: html,
          textversion: text,
          ampversion: amp,
          preventThreading,
          minifyHTML,
          host,
          port,
          username,
          password,
          from,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      console.log('Email sent successfully')
    } catch (error) {
      console.log(error)
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
      <div className='editors'>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={minifyHTML}
                  onChange={(e) => setMinifyHTML(e.target.checked)}
                  name='minifyHTML'
                  color='primary'
                />
              }
              label='Minify'
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={wordWrap}
                  onChange={(e) => setWordWrap(e.target.checked)}
                  name='wordWrap'
                  color='primary'
                />
              }
              label='Word wrap'
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={preventThreading}
                  onChange={(e) => setPreventThreading(e.target.checked)}
                  name='preventThreading'
                  color='primary'
                />
              }
              label='Prevent Threading'
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              id='host'
              label='host'
              value={host}
              onChange={(e) => setHost(e.target.value)}
              variant='outlined'
              size='small'
            />

            <TextField
              id='port'
              label='port'
              value={port}
              onChange={(e) => setPort(e.target.value)}
              variant='outlined'
              size='small'
            />

            <TextField
              id='email'
              label='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant='outlined'
              size='small'
            />

            <TextField
              id='pass'
              label='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant='outlined'
              size='small'
            />

            <TextField
              id='from'
              label='from'
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              variant='outlined'
              size='small'
            />
          </Box>
          <Button
            component='label'
            role={undefined}
            variant='contained'
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
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
            }}
          >
            <Button
              variant={activeEditor === EDITOR_TYPE.HTML ? 'outlined' : 'contained'}
              onClick={() => handleEditorChange(EDITOR_TYPE.HTML)}
            >
              html
            </Button>

            <Button
              variant={activeEditor === EDITOR_TYPE.TEXT ? 'outlined' : 'contained'}
              onClick={() => handleEditorChange(EDITOR_TYPE.TEXT)}
            >
              text
            </Button>

            <Button
              variant={activeEditor === EDITOR_TYPE.AMP ? 'outlined' : 'contained'}
              onClick={() => handleEditorChange(EDITOR_TYPE.AMP)}
            >
              amp
            </Button>

            <Box sx={{ flexGrow: 1 }}>
              <Split className='split' sizes={sizes} onDragEnd={(sizes) => setSizes(sizes)}>
                <TagsInput value={email} onChange={setEmail} />
                <TextField
                  variant='outlined'
                  label='subject line'
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Split>
            </Box>

            <Button variant='contained' color='primary' onClick={() => sendEmail()}>
              Send Email
            </Button>
          </Box>
        </div>
      </div>
      <Split
        className='split'
        sizes={editorSizes}
        onDragEnd={(editorSizes) => setEditorSizes(editorSizes)}
      >
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
        <div className='workspace-preview'>
          {editors.map(
            (editor) =>
              activeEditor === editor.type && <iframe key={editor.type} srcDoc={editor.value} />
          )}
        </div>
      </Split>
    </div>
  )
}

export default App
