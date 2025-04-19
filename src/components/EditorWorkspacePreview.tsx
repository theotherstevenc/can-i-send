/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Editor } from '@monaco-editor/react'
import Split from 'react-split'

import { useAppContext } from '../context/AppContext'
import { useEditorContext } from '../context/EditorContext'

import { workspaceEditorStyles, workspacePreviewIframeStyles } from '../styles/global.styles'
import { updateStore } from '../utils/updateStore'

const EditorWorkspacePreview = () => {
  const { html, setHtml, text, setText, amp, setAmp, workingFileID, setTriggerFetch } = useEditorContext()
  const { isMinifyEnabled, isWordWrapEnabled, activeEditor } = useAppContext()
  const [editorSizes, setEditorSizes] = useState<number[]>([50, 50])

  const MOSAIC_OPTION_ON = 'on'
  const MOSAIC_OPTION_OFF = 'off'
  const DEBOUNCE_DELAY = 2000

  const getEditorsConfig = (html: string, setHtml: (html: string) => void, text: string, setText: (text: string) => void, amp: string, setAmp: (amp: string) => void) => [
    {
      type: 'html',
      language: 'html',
      value: html,
      onChange: (newValue: string | undefined) => {
        setHtml(newValue || '')
      },
    },
    {
      type: 'text',
      language: 'text',
      value: text,
      onChange: (newValue: string | undefined) => {
        setText(newValue || '')
      },
    },
    {
      type: 'amp',
      language: 'html',
      value: amp,
      onChange: (newValue: string | undefined) => {
        setAmp(newValue || '')
      },
    },
  ]

  const editors = getEditorsConfig(html, setHtml, text, setText, amp, setAmp)

  useEffect(() => {
    if (!workingFileID) {
      return
    }

    const debounceSave = setTimeout(async () => {
      const API_URL = '/api/update-editor'
      const HTTP_METHOD = 'POST'
      const COLLECTION = 'workingFiles'
      const DOCUMENT = workingFileID
      const ACTION = 'update'
      const firestoreObj = { html, text, amp }

      await updateStore(COLLECTION, DOCUMENT, ACTION, API_URL, HTTP_METHOD, firestoreObj, setTriggerFetch)
    }, DEBOUNCE_DELAY)

    return () => {
      clearTimeout(debounceSave)
    }
  }, [html, text, amp])

  return (
    <Box sx={workspaceEditorStyles}>
      <Split className='split-component' sizes={editorSizes} onDragEnd={(editorSizes) => setEditorSizes(editorSizes)}>
        <Box>
          {editors.map(
            (editor) =>
              activeEditor === editor.type && (
                <Editor
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
        <Box>{editors.map((editor) => activeEditor === editor.type && <iframe style={workspacePreviewIframeStyles} key={editor.type} srcDoc={editor.value} />)}</Box>
      </Split>
    </Box>
  )
}
export default EditorWorkspacePreview
