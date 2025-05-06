import { useMediaQuery } from '@mui/material'
import { darkTheme, lightTheme } from '../styles/global.theme'

const usePreferredTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  return prefersDarkMode ? darkTheme : lightTheme
}

export default usePreferredTheme
