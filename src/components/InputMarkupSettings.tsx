/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Checkbox, FormControlLabel } from '@mui/material'
import { useAppContext } from '../context/AppContext'
import { useEditorContext } from '../context/EditorContext'
import { useEffect } from 'react'
import { customMinifier } from '../utils/customMinifier'
import managePersistentState from '../utils/managePersistentState'

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
    managePersistentState({ [name]: checked })
  }

  useEffect(() => {
    if (isMinifyEnabled) {
      setOriginalHtml(html)
      setHtml(customMinifier(html))
    } else {
      setHtml(originalHtml)
    }
  }, [isMinifyEnabled])

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
        }}>
        <FormControlLabel control={<Checkbox name='isMinifyEnabled' color='primary' />} label='Minify' checked={isMinifyEnabled} onChange={handleChange} />

        <FormControlLabel control={<Checkbox name='isWordWrapEnabled' color='primary' />} label='Word wrap' checked={isWordWrapEnabled} onChange={handleChange} />

        <FormControlLabel control={<Checkbox name='isPreventThreadingEnabled' color='primary' />} label='Prevent Threading' checked={isPreventThreadingEnabled} onChange={handleChange} />
      </Box>
    </>
  )
}
export default InputMarkupSettings
