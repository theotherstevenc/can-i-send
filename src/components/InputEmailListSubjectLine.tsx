import { Box, TextField } from '@mui/material'
import Split from 'react-split'
import { TagsInput } from 'react-tag-input-component'
import { useAppContext } from '../context/AppContext'
import { updateStore } from '../utils/updateStore'
import usePersistentSizes from '../utils/usePersistentSizes'
import { INPUT_EMAIL_LIST_SUBJECT_LINE_SPLIT_SIZES_DEFAULT, INPUT_EMAIL_LIST_SUBJECT_LINE_SPLIT_SIZES_STORAGE_KEY } from '../utils/constants'

const API_URL = '/api/update-editor'
const HTTP_METHOD = 'POST'
const COLLECTION = 'config'
const DOCUMENT = 'editorSettings'
const ACTION = 'update'

const InputEmailListSubjectLine = () => {
  const { subject, setSubject, emailAddresses, setEmailAddresses } = useAppContext()
  const [sizes, setSizes] = usePersistentSizes(INPUT_EMAIL_LIST_SUBJECT_LINE_SPLIT_SIZES_STORAGE_KEY, INPUT_EMAIL_LIST_SUBJECT_LINE_SPLIT_SIZES_DEFAULT)

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
        <Split className='split-component' sizes={sizes} onDragEnd={setSizes}>
          <TagsInput value={emailAddresses} onChange={handleEmailAddressesChange} />
          <TextField id='subject' className='full-height' variant='outlined' label='subject line' value={subject} size='small' onBlur={handleBlur} onChange={handleChange} />
        </Split>
      </Box>
    </>
  )
}
export default InputEmailListSubjectLine
