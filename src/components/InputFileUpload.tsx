import { Tooltip } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styled from '@emotion/styled'
import { useAppContext } from '../context/AppContext'
import { useEditorContext } from '../context/EditorContext'

import { useRef } from 'react'
import { createNewFile } from '../utils/createNewFile'
import { StyledIconButton } from './InputIconButton'
import { BTN_UPLOAD_INVALID_FILE, BTN_UPLOAD_LABEL, HTTP_STATUS_ERROR } from '../utils/constants'

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
  const { setHtml, setText, setAmp, setWorkingFileID, setWorkingFileName, setTriggerFetch } = useEditorContext()
  const { setIsMinifyEnabled, setIsWordWrapEnabled } = useAppContext()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMinifyEnabled(false)
    setIsWordWrapEnabled(false)

    const file = e.target.files?.[0]

    if (!file) {
      console.error(BTN_UPLOAD_INVALID_FILE)
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
      throw new Error(HTTP_STATUS_ERROR + response.status)
    }

    const text = await response.text()

    if (!text) {
      throw new Error('Empty response body')
    }

    const isBoilerplateApplied = true
    const fileName = file.name.replace(/\.[^/.]+$/, '')
    const boilerPlateMarkup = JSON.parse(text)

    await createNewFile(fileName, boilerPlateMarkup, isBoilerplateApplied, setWorkingFileID, setWorkingFileName, setHtml, setText, setAmp, setTriggerFetch)
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <>
      <Tooltip title={BTN_UPLOAD_LABEL} arrow enterDelay={1000}>
        <StyledIconButton onClick={handleButtonClick} aria-label={BTN_UPLOAD_LABEL}>
          <CloudUploadIcon />
        </StyledIconButton>
      </Tooltip>

      <VisuallyHiddenInput ref={fileInputRef} type='file' accept='.eml' tabIndex={-1} onChange={(e) => handleFileUpload(e)} />
    </>
  )
}

export default InputFileUpload
