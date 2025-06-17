import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@mui/material', () => ({
  useMediaQuery: vi.fn(),
}))

import { useMediaQuery } from '@mui/material'
import { darkTheme, lightTheme } from '../../styles/global.theme'
import { usePreferredTheme } from '../usePreferredTheme'

describe('usePreferredTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns darkTheme when prefers-color-scheme is dark', () => {
    vi.mocked(useMediaQuery).mockReturnValue(true)
    expect(usePreferredTheme()).toBe(darkTheme)
  })

  it('returns lightTheme when prefers-color-scheme is not dark', () => {
    vi.mocked(useMediaQuery).mockReturnValue(false)
    expect(usePreferredTheme()).toBe(lightTheme)
  })
})
