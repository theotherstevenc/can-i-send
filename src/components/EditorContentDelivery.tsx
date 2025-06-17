import { Box } from '@mui/material'
import { editorActionsStyles } from '../styles/global.styles'

import { EditorSelectorButtons, EditorSendButton, InputEmailListSubjectLine } from '../components'

const EditorContentDelivery = () => (
  <Box sx={editorActionsStyles}>
    <EditorSelectorButtons />
    <InputEmailListSubjectLine />
    <EditorSendButton />
  </Box>
)
export default EditorContentDelivery
