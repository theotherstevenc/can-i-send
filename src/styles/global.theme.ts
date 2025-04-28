import { createTheme } from '@mui/material/styles'

const focusVisible = {
  outline: '2px solid #1976d2',
  outlineOffset: '2px',
}

export const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        enterDelay: 1000,
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          focusVisible,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          focusVisible,
        },
      },
    },
  },
})
