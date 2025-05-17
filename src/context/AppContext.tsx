/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

import { AppContextProps, SenderSettings } from '../interfaces'
import { FETCH_ERROR } from '../utils/constants'

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [isMinifyEnabled, setIsMinifyEnabled] = useState(false)
  const [isWordWrapEnabled, setIsWordWrapEnabled] = useState(false)
  const [isPreventThreadingEnabled, setIsPreventThreadingEnabled] = useState(false)
  const [hideWorkingFiles, setHideWorkingFiles] = useState<boolean>(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeEditor, setActiveEditor] = useState('')
  const [subject, setSubject] = useState<string>('')
  const [emailAddresses, setEmailAddresses] = useState<string[]>([])
  const [inputSenderSettings, setInputSenderSettings] = useState<SenderSettings>({
    host: '',
    port: '',
    username: '',
    pass: '',
    from: '',
  })

  useEffect(() => {
    const editorSettings = doc(db, 'config', 'editorSettings')
    const unsubscribe = onSnapshot(
      editorSettings,
      (doc) => {
        const data = doc.data()
        if (data) {
          const { subject, host, port, username, pass, from, isMinifyEnabled, isWordWrapEnabled, isPreventThreadingEnabled, activeEditor, emailAddresses, hideWorkingFiles, isDarkMode, isAuth } = data
          setIsAuth(isAuth)
          setSubject(subject)
          setIsMinifyEnabled(isMinifyEnabled)
          setIsWordWrapEnabled(isWordWrapEnabled)
          setIsPreventThreadingEnabled(isPreventThreadingEnabled)
          setIsDarkMode(isDarkMode)
          setHideWorkingFiles(hideWorkingFiles)
          setActiveEditor(activeEditor)
          setEmailAddresses(emailAddresses)
          setInputSenderSettings({ host, port, username, pass, from })
        }
      },
      (error) => {
        console.error(FETCH_ERROR, error)
      }
    )

    return () => unsubscribe()
  }, [])

  return (
    <AppContext.Provider
      value={{
        isMinifyEnabled,
        setIsMinifyEnabled,
        isWordWrapEnabled,
        setIsWordWrapEnabled,
        isPreventThreadingEnabled,
        setIsPreventThreadingEnabled,
        activeEditor,
        setActiveEditor,
        subject,
        setSubject,
        emailAddresses,
        setEmailAddresses,
        inputSenderSettings,
        setInputSenderSettings,
        hideWorkingFiles,
        setHideWorkingFiles,
        isDarkMode,
        setIsDarkMode,
        isAuth,
        setIsAuth,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
