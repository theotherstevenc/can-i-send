export const EDITOR_TYPE = {
  HTML: 'html',
  TEXT: 'text',
  AMP: 'amp',
} as const

// dynamically type from EDITOR_TYPE
export type EditorType = (typeof EDITOR_TYPE)[keyof typeof EDITOR_TYPE]

export type EmailData = {
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

export type OptionCheckBoxProps = {
  minifyHTML: boolean
  wordWrap: boolean
  preventThreading: boolean
  setMinifyHTML: (value: boolean) => void
  setWordWrap: (value: boolean) => void
  setPreventThreading: (value: boolean) => void
}

export interface EditorContextProps {
  html: string
  setHtml: React.Dispatch<React.SetStateAction<string>>
  originalHtml: string
  setOriginalHtml: React.Dispatch<React.SetStateAction<string>>
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
