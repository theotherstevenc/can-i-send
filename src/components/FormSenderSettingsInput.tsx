import { TextField } from '@mui/material'
import useEditorContext from '../hooks/useEditorContext'

const API_URL = '/api/encrypt'
const HTTP_METHOD_POST = 'POST'

const FormSenderSettingsInput = () => {
  const { senderSettings, setSenderSettings } = useEditorContext()

  const updateSenderSettings = (key: string, value: string) => {
    setSenderSettings((prevSettings) => {
      return { ...prevSettings, [key]: value }
    })
  }

  const encryptString = async (text: string): Promise<string> => {
    if (!text) return ''
    try {
      const response = await fetch(API_URL, {
        method: HTTP_METHOD_POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }

      const data = await response.json()
      return data.encrypted
    } catch (error) {
      console.error('Error encrypting string:', error)
      return ''
    }
  }

  return (
    <>
      <TextField id='host' label='host' value={senderSettings.host} onChange={(e) => updateSenderSettings('host', e.target.value)} variant='outlined' size='small' />

      <TextField id='port' label='port' value={senderSettings.port} onChange={(e) => updateSenderSettings('port', e.target.value)} variant='outlined' size='small' />

      <TextField
        id='username'
        label='username'
        value={senderSettings.user}
        onChange={(e) => updateSenderSettings('user', e.target.value)}
        variant='outlined'
        size='small'
      />

      <TextField
        id='pass'
        label='password'
        type='password'
        value={senderSettings.pass}
        onChange={(e) => updateSenderSettings('pass', e.target.value)}
        onBlur={async (e) => updateSenderSettings('pass', await encryptString(e.target.value))}
        variant='outlined'
        size='small'
      />

      <TextField id='from' label='from' value={senderSettings.from} onChange={(e) => updateSenderSettings('from', e.target.value)} variant='outlined' size='small' />
    </>
  )
}
export default FormSenderSettingsInput
