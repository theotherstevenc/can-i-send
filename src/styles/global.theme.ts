import { createTheme } from '@mui/material/styles'

const focusVisible = {
  outline: '2px solid #1976d2',
  outlineOffset: '2px',
}

const sharedComponentProps = {
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
        ':focus-visible': focusVisible,
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        ':focus-visible': focusVisible,
      },
    },
  },
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff',
    },
  },
  components: sharedComponentProps,
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1e1e1e',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b3b3b3',
    },
  },
  components: sharedComponentProps,
})
