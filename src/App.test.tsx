import { render } from '@testing-library/react'
import App from './App'
import { describe, it } from 'vitest'
import { AppProvider } from './context/AppContext'

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    )
  })
})
