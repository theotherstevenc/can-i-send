import { Box, TextField } from '@mui/material'
import { useState } from 'react'
import Split from 'react-split'
import { TagsInput } from 'react-tag-input-component'
import { useAppContext } from '../context/AppContext'
import managePersistentState from '../utils/managePersistentState'

const InputEmailListSubjectLine = () => {
  const [sizes, setSizes] = useState<number[]>([50, 50])
  const { subject, setSubject, emailAddresses, setEmailAddresses } = useAppContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }

  const handleBlur = () => {
    managePersistentState({ subject })
  }

  const handleEmailAddressesChange = (newEmailAddresses: string[]) => {
    setEmailAddresses(newEmailAddresses)
    managePersistentState({ emailAddresses: newEmailAddresses })
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
