import { Button } from '@mui/material'
import { EDITOR_TYPE, EditorType } from '../util/types'
import { EditorContext } from '../context/EditorContext'
import { useContext } from 'react'

const EditorSelectorButtons = () => {
  const context = useContext(EditorContext)

  if (!context) throw new Error('useEditorContext must be used within an EditorProvider')

  const { activeEditor, setActiveEditor } = context

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
