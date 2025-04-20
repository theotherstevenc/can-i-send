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

  const settings = [
    { name: 'isMinifyEnabled', label: 'Minify', checked: isMinifyEnabled, setter: setIsMinifyEnabled },
    { name: 'isWordWrapEnabled', label: 'Word wrap', checked: isWordWrapEnabled, setter: setIsWordWrapEnabled },
    { name: 'isPreventThreadingEnabled', label: 'Prevent Threading', checked: isPreventThreadingEnabled, setter: setIsPreventThreadingEnabled },
  ]

  const handleChange = (event: React.SyntheticEvent, checked: boolean) => {
    const target = event.target as HTMLInputElement
    const { name } = target

    // Find the setting object from the settings array that matches the name of the checkbox being toggled
    const setting = settings.find((setting) => setting.name === name)

    if (setting) {
      setting.setter(checked)
    }

    const API_URL = '/api/update-editor'
    const HTTP_METHOD = 'POST'
    const COLLECTION = 'config'
    const DOCUMENT = 'editorSettings'
    const ACTION = 'update'
    const firestoreObj = { [name]: checked }

    updateStore(COLLECTION, DOCUMENT, ACTION, API_URL, HTTP_METHOD, firestoreObj)
  }

  const updateHtml = () => {
    if (isMinifyEnabled) {
      setOriginalHtml(html)
      setHtml(customMinifier(html))
    } else {
      setHtml(originalHtml)
    }
  }

  useEffect(() => {
    updateHtml()
  }, [isMinifyEnabled])

  return (
    <>
      {settings.map(({ name, label, checked }) => (
        <FormControlLabel key={name} control={<Checkbox name={name} color='primary' />} label={label} checked={checked} onChange={handleChange} />
      ))}
    </>
  )
}
export default InputMarkupSettings
