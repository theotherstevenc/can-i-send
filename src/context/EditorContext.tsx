/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react'
import { EditorContextProps, WorkingFile } from '../interfaces'

const EditorContext = createContext<EditorContextProps | undefined>(undefined)

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [html, setHtml] = useState<string>('')
  const [originalHtml, setOriginalHtml] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [amp, setAmp] = useState<string>('')
  const [workingFileID, setWorkingFileID] = useState<string>('')
  const [deletedWorkingFileID, setDeletedWorkingFileID] = useState<string>('')
  const [workingFileName, setWorkingFileName] = useState<string>('')
  const [files, setFiles] = useState<WorkingFile[]>([])

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
        deletedWorkingFileID,
        setDeletedWorkingFileID,
        workingFileName,
        setWorkingFileName,
        files,
        setFiles,
      }}>
      {children}
    </EditorContext.Provider>
  )
}

export const useEditorContext = (): EditorContextProps => {
  const context = useContext(EditorContext)
  if (context === undefined) {
    throw new Error('useEditorContext must be used within an EditorProvider')
  }
  return context
}
