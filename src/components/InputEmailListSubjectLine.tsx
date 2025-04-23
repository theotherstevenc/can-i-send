import { Box, TextField } from '@mui/material'
import { useState } from 'react'
import Split from 'react-split'
import { TagsInput } from 'react-tag-input-component'
import { useAppContext } from '../context/AppContext'
import { updateStore } from '../utils/updateStore'

const API_URL = '/api/update-editor'
const HTTP_METHOD = 'POST'
const COLLECTION = 'config'
const DOCUMENT = 'editorSettings'
const ACTION = 'update'

const InputEmailListSubjectLine = () => {
  const [sizes, setSizes] = useState<number[]>([50, 50])
  const { subject, setSubject, emailAddresses, setEmailAddresses } = useAppContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }

  const handleBlur = () => {
    const firestoreObj = { subject }
    updateStore(COLLECTION, DOCUMENT, ACTION, API_URL, HTTP_METHOD, firestoreObj)
  }

  const handleEmailAddressesChange = (newEmailAddresses: string[]) => {
    const firestoreObj = { emailAddresses: newEmailAddresses }
    setEmailAddresses(newEmailAddresses)
    updateStore(COLLECTION, DOCUMENT, ACTION, API_URL, HTTP_METHOD, firestoreObj)
  }

  return (
    <>
      <Box className='split-container'>
        <Split className='split-component' sizes={sizes} onDragEnd={(sizes) => setSizes(sizes)}>
          <TagsInput value={emailAddresses} onChange={handleEmailAddressesChange} />
          <TextField id='subject' className='full-height' variant='outlined' label='subject line' value={subject} size='small' onBlur={handleBlur} onChange={handleChange} />
        </Split>
      </Box>
    </>
  )
}
export default InputEmailListSubjectLine
