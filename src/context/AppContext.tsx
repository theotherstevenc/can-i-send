import React, { createContext, useState, ReactNode } from 'react'
import { EDITOR_TYPE } from '../util/types'
import { defaults } from '../util/defaults'

interface AlertState {
  message: string
  severity: 'error' | 'success'
  open: boolean
}

interface SenderSettings {
  host: string
  port: string
  user: string
  pass: string
  from: string
}

interface AppContextProps {
  activeEditor: string
  setActiveEditor: React.Dispatch<React.SetStateAction<string>>
  editorSizes: number[]
  setEditorSizes: React.Dispatch<React.SetStateAction<number[]>>
  sizes: number[]
  setSizes: React.Dispatch<React.SetStateAction<number[]>>
  email: string[]
  setEmail: React.Dispatch<React.SetStateAction<string[]>>
  subject: string
  setSubject: React.Dispatch<React.SetStateAction<string>>
  originalHtml: string
  setOriginalHtml: React.Dispatch<React.SetStateAction<string>>
  html: string
  setHtml: React.Dispatch<React.SetStateAction<string>>
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  amp: string
  setAmp: React.Dispatch<React.SetStateAction<string>>
  preventThreading: boolean
  setPreventThreading: React.Dispatch<React.SetStateAction<boolean>>
  minifyHTML: boolean
  setMinifyHTML: React.Dispatch<React.SetStateAction<boolean>>
  wordWrap: boolean
  setWordWrap: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  alertState: AlertState
  setAlertState: React.Dispatch<React.SetStateAction<AlertState>>
  senderSettings: SenderSettings
  setSenderSettings: React.Dispatch<React.SetStateAction<SenderSettings>>
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

const AppProvider = ({ children }: { children: ReactNode }) => {
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
  const [alertState, setAlertState] = useState<AlertState>({
    message: '',
    severity: 'success',
    open: false,
  })

  const localSenderSettings = JSON.parse(localStorage.getItem('senderSettings') || '{}')
  const [senderSettings, setSenderSettings] = useState<SenderSettings>({
    host: localSenderSettings.host || '',
    port: localSenderSettings.port || '',
    user: localSenderSettings.user || '',
    pass: localSenderSettings.pass || '',
    from: localSenderSettings.from || '',
  })

  return (
    <AppContext.Provider
      value={{
        activeEditor,
        setActiveEditor,
        alertState,
        setAlertState,
        amp,
        setAmp,
        editorSizes,
        setEditorSizes,
        email,
        setEmail,
        html,
        setHtml,
        loading,
        setLoading,
        minifyHTML,
        setMinifyHTML,
        originalHtml,
        setOriginalHtml,
        preventThreading,
        setPreventThreading,
        senderSettings,
        setSenderSettings,
        sizes,
        setSizes,
        subject,
        setSubject,
        text,
        setText,
        wordWrap,
        setWordWrap,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
