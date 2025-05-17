import { User } from 'firebase/auth'

export interface SenderSettings {
  host: string
  port: string
  username: string
  pass: string
  from: string
}

export interface EmailData {
  testaddress: string[]
  testsubject: string
  htmlversion: string
  textversion: string
  ampversion: string
  host: string
  port: string
  username: string
  pass: string
  from: string
}

export interface WorkingFile {
  id: string
  fileName: string
  html: string
  text: string
  amp: string
}

export interface EditorContextProps {
  html: string
  setHtml: (html: string) => void
  originalHtml: string
  setOriginalHtml: (html: string) => void
  text: string
  setText: (text: string) => void
  amp: string
  setAmp: (amp: string) => void
  workingFileID: string
  setWorkingFileID: (id: string) => void
  deletedWorkingFileID: string
  setDeletedWorkingFileID: (id: string) => void
  workingFileName: string
  setWorkingFileName: (name: string) => void
  files: WorkingFile[]
  setFiles: React.Dispatch<React.SetStateAction<WorkingFile[]>>
}

export interface AppContextProps {
  isMinifyEnabled: boolean
  setIsMinifyEnabled: (isMinifyEnabled: boolean) => void
  isWordWrapEnabled: boolean
  setIsWordWrapEnabled: (isWordWrapEnabled: boolean) => void
  isPreventThreadingEnabled: boolean
  setIsPreventThreadingEnabled: (isPreventThreadingEnabled: boolean) => void
  activeEditor: string
  setActiveEditor: (editor: string) => void
  subject: string
  setSubject: (subject: string) => void
  emailAddresses: string[]
  setEmailAddresses: (emailAddresses: string[]) => void
  inputSenderSettings: SenderSettings
  setInputSenderSettings: React.Dispatch<React.SetStateAction<SenderSettings>>
  hideWorkingFiles: boolean
  setHideWorkingFiles: React.Dispatch<React.SetStateAction<boolean>>
  isDarkMode: boolean
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  user: User | null
}
