import { describe, it, expect, vi } from 'vitest'

vi.mock('../logError', () => ({
  logError: vi.fn(),
}))

import { encryptString } from '../encryptString'
import { logError } from '../logError'

describe('encryptString', () => {
  it('returns empty string if input is empty', async () => {
    const result = await encryptString('')
    expect(result).toBe('')
  })

  it('returns encrypted string when API call succeeds', async () => {
    const mockEncrypted = 'mocked-encrypted'
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ encrypted: mockEncrypted }),
    }

    global.fetch = vi.fn().mockResolvedValue(mockResponse)

    const result = await encryptString('hello')

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/encrypt',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'hello' }),
      })
    )
    expect(result).toBe(mockEncrypted)
  })

  it('returns empty string and logs error if API returns error', async () => {
    const mockError = 'fail'
    const mockResponse = {
      ok: false,
      json: vi.fn().mockResolvedValue({ error: mockError }),
    }
    global.fetch = vi.fn().mockResolvedValue(mockResponse)

    const result = await encryptString('bad input')

    expect(result).toBe('')
    expect(logError).toHaveBeenCalledWith('Error encrypting string:', 'encryptString', expect.any(Error))
  })

  it('returns empty string and logs error if fetch throws', async () => {
    const fetchError = new Error('Network failure')
    global.fetch = vi.fn().mockRejectedValue(fetchError)

    const result = await encryptString('network issue')

    expect(result).toBe('')
    expect(logError).toHaveBeenCalledWith('Error encrypting string:', 'encryptString', fetchError)
  })
})
