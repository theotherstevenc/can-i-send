import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createNewFile } from '../createNewFile'

vi.mock('firebase/firestore', () => ({
  addDoc: vi.fn(() => Promise.resolve({ id: 'test-id' })),
  collection: vi.fn(() => 'mockCollection'),
  getFirestore: vi.fn(() => ({})),
}))
vi.mock('../firebase', () => ({ db: {} }))
vi.mock('./logError', () => ({ logError: vi.fn() }))

let setWorkingFileID: ReturnType<typeof vi.fn>
let setWorkingFileName: ReturnType<typeof vi.fn>
let setHtml: ReturnType<typeof vi.fn>
let setText: ReturnType<typeof vi.fn>
let setAmp: ReturnType<typeof vi.fn>
let setIsFileLocked: ReturnType<typeof vi.fn>

describe('createNewFile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setWorkingFileID = vi.fn()
    setWorkingFileName = vi.fn()
    setHtml = vi.fn()
    setText = vi.fn()
    setAmp = vi.fn()
    setIsFileLocked = vi.fn()
  })

  it('calls setter functions with correct values', async () => {
    await createNewFile('My File', { html: '<h1>Hello</h1>', text: 'Hello', amp: '<amp>' }, true, setWorkingFileID, setWorkingFileName, setHtml, setText, setAmp, setIsFileLocked)

    expect(setWorkingFileID).toHaveBeenCalledWith('test-id')
    expect(setWorkingFileName).toHaveBeenCalledWith('My File')
    expect(setHtml).toHaveBeenCalledWith('<h1>Hello</h1>')
    expect(setText).toHaveBeenCalledWith('Hello')
    expect(setAmp).toHaveBeenCalledWith('<amp>')
    expect(setIsFileLocked).toHaveBeenCalledWith(false)
  })

  it('creates a file with empty markup when boilerplate is false', async () => {
    await createNewFile('No Boilerplate', { html: '', text: '', amp: '' }, false, setWorkingFileID, setWorkingFileName, setHtml, setText, setAmp, setIsFileLocked)

    expect(setWorkingFileID).toHaveBeenCalledWith('test-id')
    expect(setWorkingFileName).toHaveBeenCalledWith('No Boilerplate')
    expect(setHtml).toHaveBeenCalledWith('')
    expect(setText).toHaveBeenCalledWith('')
    expect(setAmp).toHaveBeenCalledWith('')
    expect(setIsFileLocked).toHaveBeenCalledWith(false)
  })
})
