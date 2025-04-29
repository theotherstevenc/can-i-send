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
  },
  components: sharedComponentProps,
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: sharedComponentProps,
})
