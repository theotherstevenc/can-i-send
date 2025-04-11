/* eslint-disable react-hooks/exhaustive-deps */
import { Editor } from '@monaco-editor/react'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Split from 'react-split'
import { useAppContext } from '../context/AppContext'
import { useEditorContext } from '../context/EditorContext'

import { workspaceEditorStyles, workspacePreviewIframeStyles } from '../styles/global.styles'

const EditorWorkspacePreview = () => {
  const { html, setHtml, text, setText, amp, setAmp, workingFileID } = useEditorContext()
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
      onChange: (newValue: string | undefined) => setText(newValue || ''),
    },
    {
      type: 'amp',
      language: 'html',
      value: amp,
      onChange: (newValue: string | undefined) => setAmp(newValue || ''),
    },
  ]

  const editors = getEditorsConfig(html, setHtml, text, setText, amp, setAmp)

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log('save everything to this ID: ', workingFileID)

      const API_URL = '/api/manage-firestore-working-files-collection'
      const HTTP_METHOD_POST = 'POST'
      try {
        fetch(API_URL, {
          method: HTTP_METHOD_POST,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ workingFileID, html, text, amp }),
        })
      } catch (error) {
        console.error('Error updating markup settings:', error)
      }
    }, DEBOUNCE_DELAY)

    return () => {
      clearTimeout(handler)
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
