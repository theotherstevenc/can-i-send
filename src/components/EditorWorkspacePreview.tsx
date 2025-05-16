/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Box } from '@mui/material'
import { Editor } from '@monaco-editor/react'
import Split from 'react-split'

import { useAppContext } from '../context/AppContext'
import { useEditorContext } from '../context/EditorContext'

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
import { db } from '../firebase'
import { updateFirestoreDoc } from '../utils/updateFirestoreDoc'

const EditorWorkspacePreview = () => {
  const { html, setHtml, text, setText, amp, setAmp, workingFileID, deletedWorkingFileID } = useEditorContext()
  const { isDarkMode, isMinifyEnabled, isWordWrapEnabled, activeEditor } = useAppContext()

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

  const COLLECTION = 'workingFiles'
  const DOCUMENT = workingFileID
  const firestoreObj = { html, text, amp }
  const DEBOUNCE_DELAY = 2000

  useEffect(() => {
    if (!workingFileID || workingFileID === deletedWorkingFileID) {
      return
    }

    const debounceSave = setTimeout(async () => {
      updateFirestoreDoc(db, COLLECTION, DOCUMENT, firestoreObj)
    }, DEBOUNCE_DELAY)

    return () => {
      clearTimeout(debounceSave)
    }
  }, [html, text, amp])

  return (
    <Box sx={workspaceEditorStyles}>
      <Split className='split-component' sizes={sizes} onDragEnd={setSizes}>
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
            return activeEditor === editor.type && <iframe style={workspacePreviewIframeStyles} key={editor.type} srcDoc={getSanitizedValue(editor)} />
          })}
        </Box>
      </Split>
    </Box>
  )
}
export default EditorWorkspacePreview
