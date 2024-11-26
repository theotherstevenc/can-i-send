import { Button } from '@mui/material'
import { EDITOR_TYPE, EditorType } from '../types/types'
import useEditorContext from '../hooks/useEditorContext'

const BUTTON_VARIANT_OUTLINED = 'outlined'
const BUTTON_VARIANT_CONTAINED = 'contained'

const EditorSelectorButtons = () => {
  const { activeEditor, setActiveEditor } = useEditorContext()

  const handleEditorChange = (editor: EditorType) => {
    setActiveEditor(editor)
  }

  return (
    <>
      <Button variant={activeEditor === EDITOR_TYPE.HTML ? BUTTON_VARIANT_CONTAINED : BUTTON_VARIANT_OUTLINED} onClick={() => handleEditorChange(EDITOR_TYPE.HTML)}>
        html
      </Button>

      <Button variant={activeEditor === EDITOR_TYPE.TEXT ? BUTTON_VARIANT_CONTAINED : BUTTON_VARIANT_OUTLINED} onClick={() => handleEditorChange(EDITOR_TYPE.TEXT)}>
        text
      </Button>

      <Button variant={activeEditor === EDITOR_TYPE.AMP ? BUTTON_VARIANT_CONTAINED : BUTTON_VARIANT_OUTLINED} onClick={() => handleEditorChange(EDITOR_TYPE.AMP)}>
        amp
      </Button>
    </>
  )
}

export default EditorSelectorButtons
