import React, { createContext, useState, ReactNode } from 'react'
import { defaults } from '../util/defaults'
import { EDITOR_TYPE } from '../util/types'
import getInitialState from '../helpers/getInitialState'

interface EditorContextProps {
  html: string
  setHtml: React.Dispatch<React.SetStateAction<string>>
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  amp: string
  setAmp: React.Dispatch<React.SetStateAction<string>>
  activeEditor: string
  setActiveEditor: React.Dispatch<React.SetStateAction<string>>
  editorSizes: number[]
  setEditorSizes: React.Dispatch<React.SetStateAction<number[]>>
  sizes: number[]
  setSizes: React.Dispatch<React.SetStateAction<number[]>>
  preventThreading: boolean
  setPreventThreading: React.Dispatch<React.SetStateAction<boolean>>
  minifyHTML: boolean
  setMinifyHTML: React.Dispatch<React.SetStateAction<boolean>>
  wordWrap: boolean
  setWordWrap: React.Dispatch<React.SetStateAction<boolean>>
  email: string[]
  setEmail: React.Dispatch<React.SetStateAction<string[]>>
  subject: string
  setSubject: React.Dispatch<React.SetStateAction<string>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  alertState: {
    message: string
    severity: 'error' | 'success'
    open: boolean
  }
  setAlertState: React.Dispatch<
    React.SetStateAction<{
      message: string
      severity: 'error' | 'success'
      open: boolean
    }>
  >
  senderSettings: {
    host: string
    port: string
    user: string
    pass: string
    from: string
  }
  setSenderSettings: React.Dispatch<
    React.SetStateAction<{
      host: string
      port: string
      user: string
      pass: string
      from: string
    }>
  >
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined)

const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [html, setHtml] = useState<string>(getInitialState('html', defaults.html.trim()))
  const [text, setText] = useState<string>(getInitialState('text', defaults.text.trim()))
  const [amp, setAmp] = useState<string>(getInitialState('amp', defaults.amp.trim()))

  const [activeEditor, setActiveEditor] = useState<string>(getInitialState('editor', EDITOR_TYPE.HTML))
  const [editorSizes, setEditorSizes] = useState<number[]>(getInitialState('editorSizes', [50, 50]))
  const [sizes, setSizes] = useState<number[]>(getInitialState('sizes', [80, 20]))

  const [preventThreading, setPreventThreading] = useState<boolean>(getInitialState('preventThreading', false))
  const [minifyHTML, setMinifyHTML] = useState<boolean>(getInitialState('minifyHTML', false))
  const [wordWrap, setWordWrap] = useState<boolean>(getInitialState('wordWrap', false))

  const [email, setEmail] = useState<string[]>(getInitialState('email', ['ex@abc.com', 'ex@xyz.com']))
  const [subject, setSubject] = useState<string>(getInitialState('subject', ''))

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

  return (
    <EditorContext.Provider
      value={{
        html,
        setHtml,
        text,
        setText,
        amp,
        setAmp,
        activeEditor,
        setActiveEditor,
        editorSizes,
        setEditorSizes,
        sizes,
        setSizes,
        preventThreading,
        setPreventThreading,
        minifyHTML,
        setMinifyHTML,
        wordWrap,
        setWordWrap,
        email,
        setEmail,
        subject,
        setSubject,
        loading,
        setLoading,
        alertState,
        setAlertState,
        senderSettings,
        setSenderSettings,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export { EditorContext, EditorProvider }
