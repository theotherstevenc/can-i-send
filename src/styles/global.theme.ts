import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
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
          ':focus-visible': {
            outline: '2px solid #1976d2',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          ':focus-visible': {
            outline: '2px solid #1976d2',
            outlineOffset: '2px',
          },
        },
      },
    },
  },
})
