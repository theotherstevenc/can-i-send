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
