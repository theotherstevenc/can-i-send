import { Button } from '@mui/material'
import { EDITOR_TYPE, EditorType } from '../types/types'
import useEditorContext from '../hooks/useEditorContext'

const EditorSelectorButtons = () => {
  const { activeEditor, setActiveEditor } = useEditorContext()

  const handleEditorChange = (editor: EditorType) => {
    setActiveEditor(editor)
  }

  return (
    <>
      <Button variant={activeEditor === EDITOR_TYPE.HTML ? 'outlined' : 'contained'} onClick={() => handleEditorChange(EDITOR_TYPE.HTML)}>
        html
      </Button>

      <Button variant={activeEditor === EDITOR_TYPE.TEXT ? 'outlined' : 'contained'} onClick={() => handleEditorChange(EDITOR_TYPE.TEXT)}>
        text
      </Button>

      <Button variant={activeEditor === EDITOR_TYPE.AMP ? 'outlined' : 'contained'} onClick={() => handleEditorChange(EDITOR_TYPE.AMP)}>
        amp
      </Button>
    </>
  )
}

export default EditorSelectorButtons
