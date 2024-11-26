import { Editor } from '@monaco-editor/react'
import { Box } from '@mui/material'
import Split from 'react-split'
import { getEditorsConfig } from '../config/editorsConfig'
import useEditorContext from '../hooks/useEditorContext'

const styles = {
  workspacePreviewIframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    overflow: 'hidden',
  },
}

const WorkspaceEditorPreview = () => {
  const { html, setHtml, text, setText, amp, setAmp, activeEditor, editorSizes, setEditorSizes, minifyHTML, wordWrap } = useEditorContext()

  const editors = getEditorsConfig(html, setHtml, text, setText, amp, setAmp)

  return (
    <Split className='split' sizes={editorSizes} onDragEnd={(editorSizes) => setEditorSizes(editorSizes)}>
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
                  readOnly: minifyHTML,
                  wordWrap: wordWrap ? 'on' : 'off',
                  lineNumbers: 'on',
                  minimap: {
                    enabled: false,
                  },
                }}
              />
            )
        )}
      </Box>
      <Box>{editors.map((editor) => activeEditor === editor.type && <iframe style={styles.workspacePreviewIframe} key={editor.type} srcDoc={editor.value} />)}</Box>
    </Split>
  )
}

export default WorkspaceEditorPreview
