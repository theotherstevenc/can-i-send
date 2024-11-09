import { Backdrop, Box, CircularProgress } from '@mui/material'

interface BackdropProgressProps {
  loading: boolean
}

const BackdropStyles = {
  zIndex: 9999,
}

const BoxStyles = {
  backgroundColor: 'InfoBackground',
  padding: '1rem',
  borderRadius: '.5rem',
}

const BackdropProgress: React.FC<BackdropProgressProps> = ({ loading }) => {
  return (
    <Backdrop open={loading} style={BackdropStyles}>
      <Box style={BoxStyles}>
        <CircularProgress color='info' size='2.5rem' thickness={4} />
      </Box>
    </Backdrop>
  )
}

export default BackdropProgress
