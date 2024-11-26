import { Backdrop, Box, CircularProgress, SxProps, Theme } from '@mui/material'
import useEditorContext from '../hooks/useEditorContext'

const BackdropProgress = () => {
  const { loading } = useEditorContext()

  const BackdropStyles: SxProps<Theme> = {
    zIndex: 9999,
  }

  const BoxStyles: SxProps<Theme> = {
    backgroundColor: 'InfoBackground',
    padding: '1rem',
    borderRadius: '.5rem',
  }

  return (
    <Backdrop open={loading} sx={BackdropStyles}>
      <Box sx={BoxStyles}>
        <CircularProgress color='info' size='2.5rem' thickness={4} />
      </Box>
    </Backdrop>
  )
}

export default BackdropProgress
