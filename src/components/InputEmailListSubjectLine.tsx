import { db } from '../firebase'
import { useAppContext } from '../context/AppContext'
import { updateFirestoreDoc } from '../utils/updateFirestoreDoc'
import { Box, TextField } from '@mui/material'
import { logError } from '../utils/logError'
import { INPUT_EMAIL_LIST_SUBJECT_LINE_SPLIT_SIZES_DEFAULT, INPUT_EMAIL_LIST_SUBJECT_LINE_SPLIT_SIZES_STORAGE_KEY } from '../utils/constants'
import Split from 'react-split'
import PillCollection from './PillCollection'
import usePersistentValue from '../utils/usePersistentValue'

const COLLECTION = 'config'
const DOCUMENT = 'editorSettings'

const InputEmailListSubjectLine = () => {
  const { subject, setSubject, emailAddresses, setEmailAddresses } = useAppContext()
  const [sizes, setSizes] = usePersistentValue(INPUT_EMAIL_LIST_SUBJECT_LINE_SPLIT_SIZES_STORAGE_KEY, INPUT_EMAIL_LIST_SUBJECT_LINE_SPLIT_SIZES_DEFAULT)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }

  const handleBlur = async () => {
    try {
      const firestoreObj = { subject }
      await updateFirestoreDoc(db, COLLECTION, DOCUMENT, firestoreObj)
    } catch (error) {
      logError('Error updating subject in Firestore', 'InputEmailListSubjectLine', error)
    }
  }

  const handleEmailAddressesChange = async (newEmailAddresses: string[]) => {
    try {
      const firestoreObj = { emailAddresses: newEmailAddresses }
      setEmailAddresses(newEmailAddresses)
      await updateFirestoreDoc(db, COLLECTION, DOCUMENT, firestoreObj)
    } catch (error) {
      logError('Error updating email addresses in Firestore', 'InputEmailListSubjectLine', error)
    }
  }

  return (
    <>
      <Box className='split-container'>
        <Split className='split-component' sizes={sizes} onDragEnd={setSizes}>
          <PillCollection pillValues={emailAddresses} setPillValues={setEmailAddresses} onChange={handleEmailAddressesChange} />
          <TextField
            id='subject'
            className='full-height'
            variant='outlined'
            label='subject line'
            value={subject}
            size='small'
            onBlur={handleBlur}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '100%',
              },
            }}
          />
        </Split>
      </Box>
    </>
  )
}
export default InputEmailListSubjectLine
