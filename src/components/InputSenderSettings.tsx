import { Dispatch, SetStateAction } from 'react'
import { TextField } from '@mui/material'
import { SenderSettings } from '../interfaces'
import { useAppContext } from '../context/AppContext'
import { encryptString } from '../utils/encryptString'
import managePersistentState from '../utils/managePersistentState'

const InputSenderSettings = () => {
  // refactor to improve readability?
  const { inputSenderSettings, setInputSenderSettings } = useAppContext() as {
    inputSenderSettings: SenderSettings
    setInputSenderSettings: Dispatch<SetStateAction<SenderSettings>>
  }

  const COLLECTION = 'config'
  const DOCUMENT = 'editorSettings'
  const ACTION = 'update'

  // refactor to improve readability?
  const handleInputChange = (id: keyof SenderSettings, value: string) => {
    setInputSenderSettings((prev: SenderSettings) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleInput = async (id: string, value: string, isBlur: boolean) => {
    // refactor to improve ease of readability?
    const processedValue = id === 'pass' && isBlur ? await encryptString(value) : value
    handleInputChange(id as keyof SenderSettings, processedValue)

    if (isBlur) {
      const firestoreObj = { ...inputSenderSettings, [id]: processedValue }
      managePersistentState(COLLECTION, DOCUMENT, ACTION, firestoreObj)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    handleInput(id, value, false)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    handleInput(id, value, true)
  }

  return (
    // refactor to reduce repetition?
    <>
      <TextField id='host' label='host' variant='outlined' size='small' value={inputSenderSettings.host} onBlur={handleBlur} onChange={handleChange} />
      <TextField id='port' label='port' variant='outlined' size='small' value={inputSenderSettings.port} onBlur={handleBlur} onChange={handleChange} sx={{ width: '70px' }} />
      <TextField id='username' label='username' variant='outlined' size='small' value={inputSenderSettings.username} onBlur={handleBlur} onChange={handleChange} />
      <TextField id='pass' label='password' type='password' variant='outlined' size='small' value={inputSenderSettings.pass} onBlur={handleBlur} onChange={handleChange} />
      <TextField id='from' label='from' variant='outlined' size='small' value={inputSenderSettings.from} onBlur={handleBlur} onChange={handleChange} />
    </>
  )
}
export default InputSenderSettings
