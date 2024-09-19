/* eslint-disable react-hooks/exhaustive-deps */
import Editor from '@monaco-editor/react'
import Split from 'react-split'
import { TagsInput } from 'react-tag-input-component'
import Modal from 'react-modal'
Modal.setAppElement('#root')

import './App.css'
import { defaults } from './util/defaults'
import { useEffect, useRef, useState } from 'react'

enum EDITOR_TYPE {
  HTML = 'html',
  TEXT = 'text',
  AMP = 'amp',
}
function App() {
  const [activeEditor, setActiveEditor] = useState<string>(EDITOR_TYPE.HTML)
  const [email, setEmail] = useState<string[]>(JSON.parse(localStorage.getItem('email') || '[]'))
  const [subject, setSubject] = useState('subject')
  const [html, setHtml] = useState<string>(defaults.html.trim())
  const [htmlCopy, setHtmlCopy] = useState<string>(defaults.html.trim())
  const [text, setText] = useState<string>(defaults.text.trim())
  const [amp, setAmp] = useState<string>(defaults.amp.trim())
  const [preventThreading, setPreventThreading] = useState(false)
  const [minifyHTML, setMinifyHTML] = useState(() => JSON.parse(localStorage.getItem('minifyHTML') || 'false'))
  const [wordWrap, setWordWrap] = useState(() => JSON.parse(localStorage.getItem('wordWrap') || 'false'))
  const [host, setHost] = useState(localStorage.getItem('host') || '')
  const [port, setPort] = useState(localStorage.getItem('port') || '')
  const [username, setUsername] = useState(localStorage.getItem('username') || '')
  const [password, setPassword] = useState(localStorage.getItem('password') || '')
  const [from, setFrom] = useState(localStorage.getItem('from') || '')

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const afterOpenModal = () => {
    const closeButton = closeButtonRef.current
    if (closeButton) {
      closeButton.focus()
    }
  }

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
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
    localStorage.setItem('email', JSON.stringify(email))
    localStorage.setItem('minifyHTML', JSON.stringify(minifyHTML))
    localStorage.setItem('wordWrap', JSON.stringify(wordWrap))
    localStorage.setItem('host', host)
    localStorage.setItem('port', port)
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    localStorage.setItem('from', from)
  }, [email, minifyHTML, wordWrap, host, port, username, password, from])

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

  return (
    <div className='App'>
      <div className='controls'>
        <button type='button' onClick={openModal}>
          Settings
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Advanced Settings'
        >
          <button ref={closeButtonRef} onClick={closeModal}>
            Close
          </button>
          <div className='setting'>
            <input type='file' id='setting-eml' accept='.eml' onChange={(e) => handleFileUpload(e)} />
            <label htmlFor='setting-eml'>Convert EML</label>
          </div>
          <div className='setting'>
            <label htmlFor='host'>host</label>
            <input type='text' id='host' value={host} onChange={(e) => setHost(e.target.value)} />
          </div>
          <div className='setting'>
            <label htmlFor='port'>port</label>
            <input type='text' id='port' value={port} onChange={(e) => setPort(e.target.value)} />
          </div>
          <div className='setting'>
            <label htmlFor='email'>username</label>
            <input type='text' id='email' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='setting'>
            <label htmlFor='pass'>password</label>
            <input type='password' id='pass' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='setting'>
            <label htmlFor='from'>from</label>
            <input type='text' id='from' value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
        </Modal>
        <div className='split-container'>
          <Split className='split'>
            <TagsInput value={email} onChange={setEmail} />
            <input type='text' value={subject} onChange={(e) => setSubject(e.target.value)} />
          </Split>
        </div>
        <button type='button' onClick={() => sendEmail()}>
          Send Email
        </button>
      </div>
      <div className='editors'>
        <button type='button' onClick={() => handleEditorChange(EDITOR_TYPE.HTML)}>
          html
        </button>
        <button type='button' onClick={() => handleEditorChange(EDITOR_TYPE.TEXT)}>
          text
        </button>
        <button type='button' onClick={() => handleEditorChange(EDITOR_TYPE.AMP)}>
          amp
        </button>

        <input
          type='checkbox'
          id='minifyHTML'
          name='minifyHTML'
          checked={minifyHTML}
          onChange={(e) => setMinifyHTML(e.target.checked)}
        />
        <label htmlFor='minifyHTML'>Minify</label>

        <input
          type='checkbox'
          id='wordWrap'
          name='wordWrap'
          checked={wordWrap}
          onChange={(e) => setWordWrap(e.target.checked)}
        />
        <label htmlFor='wordWrap'>Word wrap</label>

        <input
          type='checkbox'
          id='preventThreading'
          name='preventThreading'
          checked={preventThreading}
          onChange={(e) => setPreventThreading(e.target.checked)}
        />
        <label htmlFor='preventThreading'>Prevent Threading</label>
      </div>
      <Split className='split'>
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
          {editors.map((editor) => activeEditor === editor.type && <iframe key={editor.type} srcDoc={editor.value} />)}
        </div>
      </Split>
    </div>
  )
}

export default App
