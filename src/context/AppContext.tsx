/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'

import { AppContextProps, SenderSettings } from '../interfaces'

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const API_URL = '/api/get-collection'
  const HTTP_METHOD = 'POST'
  const COLLECTION = 'config'
  const DOCUMENT = 'editorSettings'

  useEffect(() => {
    const fetchFirestoreCollection = async () => {
      try {
        const response = await fetch(API_URL, {
          method: HTTP_METHOD,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ COLLECTION, DOCUMENT }),
        })
        if (!response.ok) {
          throw new Error(`Error fetching Firestore collection: ${response.statusText}`)
        }
        const data = await response.json()
        const { subject, host, port, username, pass, from, isMinifyEnabled, isWordWrapEnabled, isPreventThreadingEnabled, activeEditor, emailAddresses, hideWorkingFiles } = data
        setSubject(subject)
        setIsMinifyEnabled(isMinifyEnabled)
        setIsWordWrapEnabled(isWordWrapEnabled)
        setIsPreventThreadingEnabled(isPreventThreadingEnabled)
        setHideWorkingFiles(hideWorkingFiles)
        setActiveEditor(activeEditor)
        setEmailAddresses(emailAddresses)
        setInputSenderSettings({ host, port, username, pass, from })
        return data
      } catch (error) {
        console.error('Error fetching Firestore collection:', error)
        return null
      }
    }

    fetchFirestoreCollection()
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
