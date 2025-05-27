/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '../firebase'
import { useAppContext } from '../context/AppContext'
import { useEditorContext } from '../context/EditorContext'
import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'
import { logError } from '../utils/logError'
import { Editor } from '@monaco-editor/react'
import { updateFirestoreDoc } from '../utils/updateFirestoreDoc'
import { workspaceEditorStyles, workspacePreviewIframeStyles } from '../styles/global.styles'
import {
  EDITOR_DARK_MODE,
  EDITOR_LIGHT_MODE,
  EDITOR_OPTION_AMP,
  EDITOR_OPTION_HTML,
  EDITOR_OPTION_TEXT,
  EDITOR_WORKSPACE_PREVIEW_SPLIT_SIZES_DEFAULT,
  EDITOR_WORKSPACE_PREVIEW_SPLIT_SIZES_STORAGE_KEY,
  MOSAIC_OPTION_OFF,
  MOSAIC_OPTION_ON,
} from '../utils/constants'
import getSanitizedValue from '../utils/getSanitizedValue'
import usePersistentSizes from '../utils/usePersistentSizes'
import forceIframeReflow from '../utils/forceIframeReflow'
import Split from 'react-split'

const EditorWorkspacePreview = () => {
  const { html, setHtml, text, setText, amp, setAmp, workingFileID, deletedWorkingFileID, files } = useEditorContext()
  const { isDarkMode, isMinifyEnabled, isWordWrapEnabled, activeEditor } = useAppContext()

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [sizes, setSizes] = usePersistentSizes(EDITOR_WORKSPACE_PREVIEW_SPLIT_SIZES_STORAGE_KEY, EDITOR_WORKSPACE_PREVIEW_SPLIT_SIZES_DEFAULT)

  const getEditorsConfig = (html: string, setHtml: (html: string) => void, text: string, setText: (text: string) => void, amp: string, setAmp: (amp: string) => void) => [
    {
      type: EDITOR_OPTION_HTML,
      language: 'html',
      value: html,
      onChange: (newValue: string | undefined) => {
        setHtml(newValue || '')
      },
    },
    {
      type: EDITOR_OPTION_TEXT,
      language: 'text',
      value: text,
      onChange: (newValue: string | undefined) => {
        setText(newValue || '')
      },
    },
    {
      type: EDITOR_OPTION_AMP,
      language: 'html',
      value: amp,
      onChange: (newValue: string | undefined) => {
        setAmp(newValue || '')
      },
    },
  ]

  const editors = getEditorsConfig(html, setHtml, text, setText, amp, setAmp)

  useEffect(() => {
    if (!workingFileID || workingFileID === deletedWorkingFileID) {
      return
    }

    if (!files || files.length === 0) {
      return
    }

    const isEditorContentEmpty = html === '' && text === '' && amp === ''

    if (workingFileID && isEditorContentEmpty) {
      const currentFile = files.find((file) => file.id === workingFileID)

      if (!currentFile) {
        logError('File not found in the list of files', 'EditorWorkspacePreview.tsx')
        return
      }

      setHtml(currentFile.html)
      setText(currentFile.text)
      setAmp(currentFile.amp)

      return
    }

    const COLLECTION = 'workingFiles'
    const DOCUMENT = workingFileID
    const firestoreObj = { html, text, amp }
    const DEBOUNCE_DELAY = 2000

    const debounceSave = setTimeout(async () => {
      try {
        await updateFirestoreDoc(db, COLLECTION, DOCUMENT, firestoreObj)
      } catch (error) {
        logError('Error auto updating Firestore', 'EditorWorkspacePreview.tsx', error)
      }
    }, DEBOUNCE_DELAY)

    return () => {
      clearTimeout(debounceSave)
    }
  }, [html, text, amp, files])

  const handleDragEnd = (newSizes: number[]) => {
    setSizes(newSizes)
    forceIframeReflow(iframeRef.current)
  }

  return (
    <Box sx={workspaceEditorStyles}>
      <Split className='split-component' sizes={sizes} onDragEnd={handleDragEnd}>
        <Box>
          {editors.map(
            (editor) =>
              activeEditor === editor.type && (
                <Editor
                  theme={isDarkMode ? EDITOR_DARK_MODE : EDITOR_LIGHT_MODE}
                  key={editor.type}
                  defaultLanguage={editor.language}
                  defaultValue={editor.value}
                  value={editor.value}
                  onChange={editor.onChange}
                  options={{
                    readOnly: isMinifyEnabled,
                    wordWrap: isWordWrapEnabled ? MOSAIC_OPTION_ON : MOSAIC_OPTION_OFF,
                    lineNumbers: MOSAIC_OPTION_ON,
                    minimap: {
                      enabled: false,
                    },
                  }}
                />
              )
          )}
        </Box>
        <Box>
          {editors.map((editor) => {
            return activeEditor === editor.type && <iframe ref={iframeRef} style={workspacePreviewIframeStyles} key={editor.type} srcDoc={getSanitizedValue(editor)} />
          })}
        </Box>
      </Split>
    </Box>
  )
}
export default EditorWorkspacePreview
