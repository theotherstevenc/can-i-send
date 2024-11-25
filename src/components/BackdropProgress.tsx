import { Backdrop, Box, CircularProgress } from '@mui/material'
import { useContext } from 'react'
import { EditorContext } from '../context/EditorContext'

const BackdropStyles = {
  zIndex: 9999,
}

const BoxStyles = {
  backgroundColor: 'InfoBackground',
  padding: '1rem',
  borderRadius: '.5rem',
}

const BackdropProgress = () => {
  const context = useContext(EditorContext)
  if (!context) throw new Error('useEditorContext must be used within an EditorProvider')

  const { loading } = context
  return (
    <Backdrop open={loading} style={BackdropStyles}>
      <Box style={BoxStyles}>
        <CircularProgress color='info' size='2.5rem' thickness={4} />
      </Box>
    </Backdrop>
  )
}

export default BackdropProgress
