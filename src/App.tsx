/* eslint-disable @typescript-eslint/no-explicit-any */
import Editor from '@monaco-editor/react'
import Split from 'react-split'

import './App.css'
import { defaults } from './util/defaults'
import { useEffect, useState } from 'react'

function App() {
  const [activeEditor, setActiveEditor] = useState('htmleditor')
  const [email, setEmail] = useState('rebelforce.test@gmail.com')
  const [subject, setSubject] = useState('subject')
  const [html, setHtml] = useState<string>(defaults.html.trim())
  const [htmlCopy, setHtmlCopy] = useState<string>(defaults.html.trim())
  const [text, setText] = useState<string>(defaults.text.trim())
  const [amp, setAmp] = useState<string>(defaults.amp.trim())
  const [preventThreading, setPreventThreading] = useState(false)
  const [minifyHTML, setMinifyHTML] = useState(false)
  const [wordWrap, setWordWrap] = useState(false)

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
    if (minifyHTML) {
      setHtmlCopy(html)
      setHtml(customMinifyHtml(html))
    } else {
      setHtml(htmlCopy)
    }
  }, [minifyHTML])

  const editors = [
    {
      id: 'htmleditor',
      language: 'html',
      value: html,
      onChange: (newValue: string | undefined) => setHtml(newValue || ''),
    },
    {
      id: 'texteditor',
      language: 'text',
      value: text,
      onChange: (newValue: string | undefined) => setText(newValue || ''),
    },
    {
      id: 'ampeditor',
      language: 'html',
      value: amp,
      onChange: (newValue: string | undefined) => setAmp(newValue || ''),
    },
  ]

  const sendEmail = async () => {
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
          preventThreading: preventThreading,
          minifyHTML: minifyHTML,
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

  const handleEditorChange = (editor: string) => {
    setActiveEditor(editor)
  }

  function handleUpdateSettings(): void {
    throw new Error('Function not implemented.')
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const text = await response.text()
      if (!text) {
        throw new Error('Empty response body')
      }

      const data = JSON.parse(text)
      // const data = await response.json()
      setHtml(data.html)
      setText(data.text)
      setAmp(data.amp)
    }
  }

  return (
    <div className='App'>
      <div className='controls'>
        <button type='button' onClick={() => handleUpdateSettings()}>
          Settings
        </button>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='text' value={subject} onChange={(e) => setSubject(e.target.value)} />
        <button type='button' onClick={() => sendEmail()}>
          Send Email
        </button>
      </div>
      <div className='editors'>
        <button type='button' onClick={() => handleEditorChange('htmleditor')}>
          html
        </button>
        <button type='button' onClick={() => handleEditorChange('texteditor')}>
          text
        </button>
        <button type='button' onClick={() => handleEditorChange('ampeditor')}>
          amp
        </button>
        <input type='checkbox' id='preventThreading' name='preventThreading' checked={preventThreading} onChange={(e) => setPreventThreading(e.target.checked)} />
        <label htmlFor='preventThreading'>Prevent Threading</label>

        <input type='checkbox' id='minifyHTML' name='minifyHTML' checked={minifyHTML} onChange={(e) => setMinifyHTML(e.target.checked)} />
        <label htmlFor='minifyHTML'>Minify</label>

        <input type='checkbox' id='wordWrap' name='wordWrap' checked={wordWrap} onChange={(e) => setWordWrap(e.target.checked)} />
        <label htmlFor='wordWrap'>Word wrap</label>

        <label htmlFor='setting-eml'>Convert EML</label>
        <input type='file' id='setting-eml' accept='.eml' onChange={(e) => handleFileUpload(e)} />
      </div>
      <Split className='split'>
        <div className='workspace-editor'>
          {editors.map(
            (editor) =>
              activeEditor === editor.id && (
                <Editor
                  key={editor.id}
                  defaultLanguage={editor.language}
                  value={editor.value}
                  defaultValue={editor.value}
                  options={{
                    readOnly: minifyHTML,
                    wordWrap: wordWrap ? 'on' : 'off',
                    lineNumbers: 'on',
                    minimap: {
                      enabled: false,
                    },
                  }}
                  onChange={editor.onChange}
                />
              )
          )}
        </div>
        <div className='workspace-preview'>{editors.map((editor) => activeEditor === editor.id && <iframe key={editor.id} srcDoc={editor.value} />)}</div>
      </Split>
    </div>
  )
}

export default App
