import { Editor } from '@monaco-editor/react'
import { Box } from '@mui/material'
import Split from 'react-split'

interface EditorConfig {
  type: string
  language: string
  value: string
  onChange: (newValue: string | undefined) => void
}

interface WorkspaceEditorPreviewProps {
  editorSizes: number[]
  setEditorSizes: (editorSizes: number[]) => void
  editors: EditorConfig[]
  activeEditor: string
  minifyHTML: boolean
  wordWrap: boolean
}

const styles = {
  workspacePreviewIframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    overflow: 'hidden',
  },
}

const WorkspaceEditorPreview: React.FC<WorkspaceEditorPreviewProps> = ({
  editorSizes,
  setEditorSizes,
  editors,
  activeEditor,
  minifyHTML,
  wordWrap,
}) => {
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
      <Box>
        {editors.map(
          (editor) => activeEditor === editor.type && <iframe style={styles.workspacePreviewIframe} key={editor.type} srcDoc={editor.value} />
        )}
      </Box>
    </Split>
  )
}

export default WorkspaceEditorPreview
