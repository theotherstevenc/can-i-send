import { db } from '../firebase'
import { useAppContext } from '../context/AppContext'
import { encryptString } from '../utils/encryptString'
import { updateFirestoreDoc } from '../utils/updateFirestoreDoc'
import { TextField } from '@mui/material'
import { SenderSettings } from '../interfaces'
import { SETTINGS_FROM, SETTINGS_HOST, SETTINGS_PASS, SETTINGS_PORT, SETTINGS_USER } from '../utils/constants'

const COLLECTION = 'config'
const DOCUMENT = 'editorSettings'

const InputSenderSettings = () => {
  const { inputSenderSettings, setInputSenderSettings } = useAppContext()

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
      try {
        await updateFirestoreDoc(db, COLLECTION, DOCUMENT, firestoreObj)
      } catch (error) {
        console.error('Error updating Firestore document:', error)
      }
    }
  }

  const handleEvent = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, isBlur: boolean) => {
    const { id, value } = e.target
    try {
      await handleInput(id, value, isBlur)
    } catch (error) {
      console.error('Error handling input event:', error)
    }
  }

  const textFields = [
    { id: SETTINGS_HOST, type: 'text', sx: {} },
    { id: SETTINGS_PORT, type: 'text', sx: { width: '70px' } },
    { id: SETTINGS_USER, type: 'text', sx: {} },
    { id: SETTINGS_PASS, type: 'password', sx: {} },
    { id: SETTINGS_FROM, type: 'text', sx: {} },
  ]

  return (
    <>
      {textFields.map((field) => (
        <TextField
          key={field.id}
          id={field.id}
          label={field.id}
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
