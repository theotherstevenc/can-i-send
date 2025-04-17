/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react'

interface EditorContextProps {
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
  workingFileName: string
  setWorkingFileName: (name: string) => void
  numberOfWorkingFiles: number
  setNumberOfWorkingFiles: React.Dispatch<React.SetStateAction<number>>
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined)

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [html, setHtml] = useState<string>('')
  const [originalHtml, setOriginalHtml] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [amp, setAmp] = useState<string>('')
  const [workingFileID, setWorkingFileID] = useState<string>('')
  const [workingFileName, setWorkingFileName] = useState<string>('')
  const [numberOfWorkingFiles, setNumberOfWorkingFiles] = useState<number>(0)

  return (
    <EditorContext.Provider
      value={{
        html,
        setHtml,
        originalHtml,
        setOriginalHtml,
        text,
        setText,
        amp,
        setAmp,
        workingFileID,
        setWorkingFileID,
        workingFileName,
        setWorkingFileName,
        numberOfWorkingFiles,
        setNumberOfWorkingFiles,
      }}>
      {children}
    </EditorContext.Provider>
  )
}

export const useEditorContext = () => {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditorContext must be used within an EditorProvider')
  }
  return context
}
