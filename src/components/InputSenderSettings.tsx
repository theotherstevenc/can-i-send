import { Dispatch, SetStateAction } from 'react'
import { Box, TextField } from '@mui/material'
import { SenderSettings } from '../interfaces'
import { useAppContext } from '../context/AppContext'
import { InputSenderSettingsStyles } from '../styles/global.styles'
import { encryptString } from '../utils/encryptString'
import managePersistentState from '../utils/managePersistentState'

const InputSenderSettings = () => {
  const { inputSenderSettings, setInputSenderSettings } = useAppContext() as {
    inputSenderSettings: SenderSettings
    setInputSenderSettings: Dispatch<SetStateAction<SenderSettings>>
  }

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
      managePersistentState({ ...inputSenderSettings, [id]: processedValue })
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
    <>
      <Box sx={InputSenderSettingsStyles}>
        <TextField id='host' label='host' variant='outlined' size='small' value={inputSenderSettings.host} onBlur={handleBlur} onChange={handleChange} />
        <TextField id='port' label='port' variant='outlined' size='small' value={inputSenderSettings.port} onBlur={handleBlur} onChange={handleChange} />
        <TextField id='username' label='username' variant='outlined' size='small' value={inputSenderSettings.username} onBlur={handleBlur} onChange={handleChange} />
        <TextField id='pass' label='password' type='password' variant='outlined' size='small' value={inputSenderSettings.pass} onBlur={handleBlur} onChange={handleChange} />
        <TextField id='from' label='from' variant='outlined' size='small' value={inputSenderSettings.from} onBlur={handleBlur} onChange={handleChange} />
      </Box>
    </>
  )
}
export default InputSenderSettings
