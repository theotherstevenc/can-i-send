import { TextField } from '@mui/material'
import { SenderSettings } from '../interfaces'
import { useAppContext } from '../context/AppContext'
import { encryptString } from '../utils/encryptString'
import { updateStore } from '../utils/updateStore'

const InputSenderSettings = () => {
  const { inputSenderSettings, setInputSenderSettings } = useAppContext()

  const API_URL = '/api/update-editor'
  const HTTP_METHOD = 'POST'
  const COLLECTION = 'config'
  const DOCUMENT = 'editorSettings'
  const ACTION = 'update'

  const handleInputChange = (id: keyof SenderSettings, value: string) => {
    setInputSenderSettings((prev: SenderSettings) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleInput = async (id: string, value: string, isBlur: boolean) => {
    const processedValue = id === 'pass' && isBlur ? await encryptString(value) : value
    handleInputChange(id as keyof SenderSettings, processedValue)

    if (isBlur) {
      const firestoreObj = { ...inputSenderSettings, [id]: processedValue }
      updateStore(COLLECTION, DOCUMENT, ACTION, API_URL, HTTP_METHOD, firestoreObj)
    }
  }

  const handleEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, isBlur: boolean) => {
    const { id, value } = e.target
    handleInput(id, value, isBlur)
  }

  const textFields = [
    { id: 'host', label: 'host', type: 'text', sx: {} },
    { id: 'port', label: 'port', type: 'text', sx: { width: '70px' } },
    { id: 'username', label: 'username', type: 'text', sx: {} },
    { id: 'pass', label: 'password', type: 'password', sx: {} },
    { id: 'from', label: 'from', type: 'text', sx: {} },
  ]

  return (
    <>
      {textFields.map((field) => (
        <TextField
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type}
          variant='outlined'
          size='small'
          value={inputSenderSettings[field.id as keyof SenderSettings]}
          onChange={(e) => handleEvent(e, false)}
          onBlur={(e) => handleEvent(e, true)}
          sx={field.sx}
        />
      ))}
    </>
  )
}
export default InputSenderSettings
