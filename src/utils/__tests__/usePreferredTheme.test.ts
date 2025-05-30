import { describe, it, expect, vi } from 'vitest'

vi.mock('@mui/material', () => ({
  useMediaQuery: vi.fn(),
}))

import * as mui from '@mui/material'
import { darkTheme, lightTheme } from '../../styles/global.theme'
import usePreferredTheme from '../usePreferredTheme'

describe('usePreferredTheme', () => {
  it('returns darkTheme when prefers dark mode', () => {
    vi.spyOn(mui, 'useMediaQuery').mockReturnValue(true)
    expect(usePreferredTheme()).toBe(darkTheme)
  })

  it('returns lightTheme when prefers light mode', () => {
    vi.spyOn(mui, 'useMediaQuery').mockReturnValue(false)
    expect(usePreferredTheme()).toBe(lightTheme)
  })
})
