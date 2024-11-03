import { Box, TextField } from '@mui/material'
import Split from 'react-split'
import { TagsInput } from 'react-tag-input-component'

interface EditorEmailListInputProps {
  sizes: number[]
  setSizes: (sizes: number[]) => void
  email: string[]
  setEmail: (email: string[]) => void
  subject: string
  setSubject: (subject: string) => void
}

const EditorEmailListInput: React.FC<EditorEmailListInputProps> = ({ sizes, setSizes, email, setEmail, subject, setSubject }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Split className='split' sizes={sizes} onDragEnd={(sizes) => setSizes(sizes)}>
          <TagsInput value={email} onChange={setEmail} />
          <TextField
            className='full-height'
            variant='outlined'
            label='subject line'
            value={subject}
            size='small'
            onChange={(e) => setSubject(e.target.value)}
          />
        </Split>
      </Box>
    </>
  )
}

export default EditorEmailListInput
