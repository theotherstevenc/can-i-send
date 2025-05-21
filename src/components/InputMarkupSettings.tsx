/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '../firebase'
import { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useEditorContext } from '../context/EditorContext'
import { customMinifier } from '../utils/customMinifier'
import { updateFirestoreDoc } from '../utils/updateFirestoreDoc'
import { SETTINGS_CHECKBOX_LABEL_MINIFY, SETTINGS_CHECKBOX_LABEL_PREVENT_THREADING, SETTINGS_CHECKBOX_LABEL_WORD_WRAP } from '../utils/constants'

const InputMarkupSettings = () => {
  const { setHtml, html, setOriginalHtml, originalHtml } = useEditorContext()
  const { isMinifyEnabled, setIsMinifyEnabled, isWordWrapEnabled, setIsWordWrapEnabled, isPreventThreadingEnabled, setIsPreventThreadingEnabled } = useAppContext()

  const settings = [
    { name: 'isMinifyEnabled', label: SETTINGS_CHECKBOX_LABEL_MINIFY, checked: isMinifyEnabled, setter: setIsMinifyEnabled },
    { name: 'isWordWrapEnabled', label: SETTINGS_CHECKBOX_LABEL_WORD_WRAP, checked: isWordWrapEnabled, setter: setIsWordWrapEnabled },
    { name: 'isPreventThreadingEnabled', label: SETTINGS_CHECKBOX_LABEL_PREVENT_THREADING, checked: isPreventThreadingEnabled, setter: setIsPreventThreadingEnabled },
  ]

  const COLLECTION = 'config'
  const DOCUMENT = 'editorSettings'

  const handleChange = async (event: React.SyntheticEvent, checked: boolean) => {
    const target = event.target as HTMLInputElement
    const { name } = target

    // Find the setting object from the settings array that matches the name of the checkbox being toggled
    const setting = settings.find((setting) => setting.name === name)

    // Update the UI first
    if (setting) {
      setting.setter(checked)
    } else {
      console.warn('No setting found for checkbox name: ' + name)
    }

    const firestoreObj = { [name]: checked }

    try {
      await updateFirestoreDoc(db, COLLECTION, DOCUMENT, firestoreObj)
    } catch (error) {
      console.error('Error updating settings: ', error)
    }
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
