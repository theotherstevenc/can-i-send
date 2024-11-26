import React, { createContext, useState, ReactNode, useEffect } from 'react'
import { defaults } from '../config/defaults'
import { EDITOR_TYPE } from '../types/types'
import usePersistentState from '../hooks/usePersistentState'
import { EditorContextProps } from '../types/types'

const EditorContext = createContext<EditorContextProps | undefined>(undefined)

const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [html, setHtml] = usePersistentState<string>('html', defaults.html.trim())
  const [text, setText] = usePersistentState<string>('text', defaults.text.trim())
  const [amp, setAmp] = usePersistentState<string>('amp', defaults.amp.trim())

  const [originalHtml, setOriginalHtml] = usePersistentState<string>('originalHtml', '')

  const [activeEditor, setActiveEditor] = usePersistentState<string>('editor', EDITOR_TYPE.HTML)
  const [editorSizes, setEditorSizes] = usePersistentState<number[]>('editorSizes', [50, 50])
  const [sizes, setSizes] = usePersistentState<number[]>('sizes', [80, 20])

  const [preventThreading, setPreventThreading] = usePersistentState<boolean>('preventThreading', false)
  const [minifyHTML, setMinifyHTML] = usePersistentState<boolean>('minifyHTML', false)
  const [wordWrap, setWordWrap] = usePersistentState<boolean>('wordWrap', false)

  const [email, setEmail] = usePersistentState<string[]>('email', ['ex@abc.com', 'ex@xyz.com'])
  const [subject, setSubject] = usePersistentState<string>('subject', '')

  const [loading, setLoading] = useState<boolean>(false)
  const [alertState, setAlertState] = useState({
    message: '',
    severity: 'success' as 'error' | 'success',
    open: false,
  })

  const [senderSettings, setSenderSettings] = usePersistentState('senderSettings', {
    host: '',
    port: '',
    user: '',
    pass: '',
    from: '',
  })

  useEffect(() => {
    localStorage.setItem('html', html)
  })
  useEffect(() => {
    localStorage.setItem('text', text)
  })
  useEffect(() => {
    localStorage.setItem('amp', amp)
  })
  useEffect(() => {
    localStorage.setItem('originalHtml', originalHtml)
  })
  useEffect(() => {
    localStorage.setItem('editor', activeEditor)
  })
  useEffect(() => {
    localStorage.setItem('editorSizes', JSON.stringify(editorSizes))
  })
  useEffect(() => {
    localStorage.setItem('sizes', JSON.stringify(sizes))
  })
  useEffect(() => {
    localStorage.setItem('preventThreading', preventThreading.toString())
  })
  useEffect(() => {
    localStorage.setItem('minifyHTML', minifyHTML.toString())
  })
  useEffect(() => {
    localStorage.setItem('wordWrap', wordWrap.toString())
  })
  useEffect(() => {
    localStorage.setItem('email', JSON.stringify(email))
  })
  useEffect(() => {
    localStorage.setItem('senderSettings', JSON.stringify(senderSettings))
  })

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
        activeEditor,
        setActiveEditor,
        editorSizes,
        setEditorSizes,
        sizes,
        setSizes,
        preventThreading,
        setPreventThreading,
        minifyHTML,
        setMinifyHTML,
        wordWrap,
        setWordWrap,
        email,
        setEmail,
        subject,
        setSubject,
        loading,
        setLoading,
        alertState,
        setAlertState,
        senderSettings,
        setSenderSettings,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export { EditorContext, EditorProvider }
