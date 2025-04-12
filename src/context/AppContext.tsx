/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { SenderSettings } from '../interfaces'
import { storageFeatureFlag } from '../utils/storageFeatureFlag'

interface AppContextProps {
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
  setInputSenderSettings: (inputSenderSettings: SenderSettings) => void
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMinifyEnabled, setIsMinifyEnabled] = useState(false)
  const [isWordWrapEnabled, setIsWordWrapEnabled] = useState(false)
  const [isPreventThreadingEnabled, setIsPreventThreadingEnabled] = useState(false)

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
    const fetchFirestoreCollection = async () => {
      const USE_LOCAL_STORAGE = await storageFeatureFlag()

      if (USE_LOCAL_STORAGE) {
        const persistentState = localStorage.getItem('persistentState')

        if (persistentState) {
          try {
            const { subject, host, port, username, pass, from, isMinifyEnabled, isWordWrapEnabled, isPreventThreadingEnabled, activeEditor, emailAddresses } = JSON.parse(persistentState)

            setSubject(subject)
            setIsMinifyEnabled(isMinifyEnabled)
            setIsWordWrapEnabled(isWordWrapEnabled)
            setIsPreventThreadingEnabled(isPreventThreadingEnabled)
            setActiveEditor(activeEditor)
            setEmailAddresses(Array.isArray(emailAddresses) ? emailAddresses : [])
            setInputSenderSettings({ host, port, username, pass, from })
          } catch (error) {
            console.error('Error parsing persistentState from localStorage:', error)
          }
        }
      } else {
        const API_URL = '/api/get-collection'
        const HTTP_METHOD_POST = 'POST'
        const COLLECTION = 'config'
        const DOCUMENT = 'editorSettings'

        try {
          const response = await fetch(API_URL, {
            method: HTTP_METHOD_POST,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ COLLECTION, DOCUMENT }),
          })
          if (!response.ok) {
            throw new Error(`Error fetching Firestore collection: ${response.statusText}`)
          }
          const data = await response.json()
          const { subject, host, port, username, pass, from, isMinifyEnabled, isWordWrapEnabled, isPreventThreadingEnabled, activeEditor, emailAddresses } = data
          setSubject(subject)
          setIsMinifyEnabled(isMinifyEnabled)
          setIsWordWrapEnabled(isWordWrapEnabled)
          setIsPreventThreadingEnabled(isPreventThreadingEnabled)
          setActiveEditor(activeEditor)
          setEmailAddresses(emailAddresses)
          setInputSenderSettings({ host, port, username, pass, from })
          return data
        } catch (error) {
          console.error('Error fetching Firestore collection:', error)
          return null
        }
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
      }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
