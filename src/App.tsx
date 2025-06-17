import './App.css'
import { EditorProvider } from './context/EditorContext'
import { usePreferredTheme } from './utils/usePreferredTheme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { EditorContainer, EditorConfigActions, EditorContentDelivery } from './components'

function App() {
  const theme = usePreferredTheme()

  return (
    <EditorProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <EditorConfigActions />
        <EditorContentDelivery />
        <EditorContainer />
      </ThemeProvider>
    </EditorProvider>
  )
}

export default App
