/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react'
import { EditorContextProps, WorkingFile } from '../interfaces'
import { WORKING_FILE_ID_KEY } from '../utils/constants'
import usePersistentValue from '../utils/usePersistentSizes'

const EditorContext = createContext<EditorContextProps | undefined>(undefined)

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [html, setHtml] = useState<string>('')
  const [originalHtml, setOriginalHtml] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [amp, setAmp] = useState<string>('')
  const [workingFileID, setWorkingFileID] = usePersistentValue<string>(WORKING_FILE_ID_KEY, '')
  const [deletedWorkingFileID, setDeletedWorkingFileID] = useState<string>('')
  const [workingFileName, setWorkingFileName] = useState<string>('')
  const [files, setFiles] = useState<WorkingFile[]>([])
  const [isFileLocked, setIsFileLocked] = useState<boolean>(false)

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
        isFileLocked,
        setIsFileLocked,
      }}>
      {children}
    </EditorContext.Provider>
  )
}

export const useEditorContext = (): EditorContextProps => {
  const context = useContext(EditorContext)
  if (context === undefined) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error('useEditorContext must be used within an EditorProvider')
    } else {
      throw new Error('Editor context is not available.')
    }
  }
  return context
}
