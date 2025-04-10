import { Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styled from '@emotion/styled'
import { useAppContext } from '../context/AppContext'
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
  const { setHtml, setText, setAmp, setIsMinifyEnabled, setIsWordWrapEnabled } = useAppContext()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMinifyEnabled(false)
    setIsWordWrapEnabled(false)

    const API_URL = '/api/upload'
    const HTTP_METHOD_POST = 'POST'

    const file = e.target.files?.[0]

    if (!file) {
      console.error('No file selected or file is invalid.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    const options = {
      method: HTTP_METHOD_POST,
      body: formData,
    }
    const response = await fetch(API_URL, options)

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
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <>
      <Button variant='contained' startIcon={<CloudUploadIcon />} onClick={handleButtonClick}>
        Upload + Convert EML
      </Button>

      <VisuallyHiddenInput ref={fileInputRef} type='file' accept='.eml' onChange={(e) => handleFileUpload(e)} />
    </>
  )
}

export default InputFileUpload
