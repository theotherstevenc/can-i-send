import { Button } from '@mui/material'
import VisuallyHiddenInput from '../styledComponents/VisuallyHiddenInput'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import useEditorContext from '../hooks/useEditorContext'

const FormUploadConvertButton = () => {
  const { setHtml, setText, setAmp } = useEditorContext()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      const url = '/api/upload'
      const options = {
        method: 'POST',
        body: formData,
      }

      const response = await fetch(url, options)

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
  }
  return (
    <Button component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon />}>
      Upload + Convert EML
      <VisuallyHiddenInput type='file' accept='.eml' onChange={(e) => handleFileUpload(e)} />
    </Button>
  )
}
export default FormUploadConvertButton
