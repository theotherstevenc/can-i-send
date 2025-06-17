import { useMediaQuery } from '@mui/material'
import { darkTheme, lightTheme } from '../styles/global.theme'

export const usePreferredTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  return prefersDarkMode ? darkTheme : lightTheme
}
