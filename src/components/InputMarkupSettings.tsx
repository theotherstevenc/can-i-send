/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, FormControlLabel } from '@mui/material'
import { useAppContext } from '../context/AppContext'
import { useEditorContext } from '../context/EditorContext'
import { useEffect } from 'react'
import { customMinifier } from '../utils/customMinifier'
import { updateStore } from '../utils/updateStore'

const InputMarkupSettings = () => {
  const { setHtml, html, setOriginalHtml, originalHtml } = useEditorContext()
  const { isMinifyEnabled, setIsMinifyEnabled, isWordWrapEnabled, setIsWordWrapEnabled, isPreventThreadingEnabled, setIsPreventThreadingEnabled } = useAppContext()

  const handleChange = (event: React.SyntheticEvent, checked: boolean) => {
    const target = event.target as HTMLInputElement
    const { name } = target
    switch (name) {
      case 'isMinifyEnabled':
        setIsMinifyEnabled(checked)
        break
      case 'isWordWrapEnabled':
        setIsWordWrapEnabled(checked)
        break
      case 'isPreventThreadingEnabled':
        setIsPreventThreadingEnabled(checked)
        break
      default:
        break
    }

    const API_URL = '/api/update-editor'
    const HTTP_METHOD = 'POST'
    const COLLECTION = 'config'
    const DOCUMENT = 'editorSettings'
    const ACTION = 'update'
    const firestoreObj = { [name]: checked }

    updateStore(COLLECTION, DOCUMENT, ACTION, API_URL, HTTP_METHOD, firestoreObj)
  }

  useEffect(() => {
    // extracting the minify logic
    if (isMinifyEnabled) {
      setOriginalHtml(html)
      setHtml(customMinifier(html))
    } else {
      setHtml(originalHtml)
    }
  }, [isMinifyEnabled])

  return (
    <>
      <FormControlLabel control={<Checkbox name='isMinifyEnabled' color='primary' />} label='Minify' checked={isMinifyEnabled} onChange={handleChange} />
      <FormControlLabel control={<Checkbox name='isWordWrapEnabled' color='primary' />} label='Word wrap' checked={isWordWrapEnabled} onChange={handleChange} />
      <FormControlLabel control={<Checkbox name='isPreventThreadingEnabled' color='primary' />} label='Prevent Threading' checked={isPreventThreadingEnabled} onChange={handleChange} />
    </>
  )
}
export default InputMarkupSettings
