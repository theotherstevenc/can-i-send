import { IconButton, Tooltip } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styled from '@emotion/styled'
import { useAppContext } from '../context/AppContext'
import { useEditorContext } from '../context/EditorContext'
import { updateStore } from '../utils/updateStore'

import { useRef } from 'react'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const InputFileUpload = () => {
  const { setHtml, setText, setAmp, workingFileID } = useEditorContext()
  const { setIsMinifyEnabled, setIsWordWrapEnabled } = useAppContext()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMinifyEnabled(false)
    setIsWordWrapEnabled(false)

    const file = e.target.files?.[0]

    if (!file) {
      console.error('No file selected or file is invalid.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    const options = {
      method: 'POST',
      body: formData,
    }
    const response = await fetch('/api/upload', options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const text = await response.text()

    if (!text) {
      throw new Error('Empty response body')
    }

    const data = JSON.parse(text)

    setHtml(data.html)
    setText(data.text)
    setAmp(data.amp)

    const API_URL = '/api/update-editor'
    const HTTP_METHOD = 'POST'
    const COLLECTION = 'workingFiles'
    const DOCUMENT = workingFileID
    const firestoreObj = { html: data.html, text: data.text, amp: data.amp }
    const ACTION = 'update'

    try {
      await updateStore(COLLECTION, DOCUMENT, ACTION, API_URL, HTTP_METHOD, firestoreObj)
    } catch (error) {
      console.error('Failed to update store:', error)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <>
      <Tooltip title='Upload + Convert EML' arrow enterDelay={1000}>
        <IconButton
          color='primary'
          onClick={handleButtonClick}
          aria-label='Upload + Convert EML'
          sx={{
            padding: '6px 16px', // Default padding for buttons
            borderRadius: '4px', // Default border radius for buttons
            backgroundColor: 'primary.main', // Default background color
            color: 'white', // Default text color
            '&:hover': {
              backgroundColor: 'primary.dark', // Default hover color
            },
          }}>
          <CloudUploadIcon />
        </IconButton>
      </Tooltip>

      <VisuallyHiddenInput ref={fileInputRef} type='file' accept='.eml' onChange={(e) => handleFileUpload(e)} />
    </>
  )
}

export default InputFileUpload
