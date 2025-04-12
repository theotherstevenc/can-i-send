import { Button } from '@mui/material'
import { useAppContext } from '../context/AppContext'
import managePersistentState from '../utils/managePersistentState'

const BUTTON_VARIANT_OUTLINED = 'outlined'
const BUTTON_VARIANT_CONTAINED = 'contained'

const EditorSelectorButtons = () => {
  const { activeEditor, setActiveEditor } = useAppContext()

  const handleClick = (editorType: string) => {
    const COLLECTION = 'config'
    const DOCUMENT = 'editorSettings'
    const ACTION = 'update'

    const firestoreObj = { activeEditor: editorType }

    setActiveEditor(editorType)
    managePersistentState(COLLECTION, DOCUMENT, ACTION, firestoreObj)
  }

  return (
    <>
      <Button variant={activeEditor === 'html' ? BUTTON_VARIANT_CONTAINED : BUTTON_VARIANT_OUTLINED} onClick={() => handleClick('html')}>
        html
      </Button>

      <Button variant={activeEditor === 'text' ? BUTTON_VARIANT_CONTAINED : BUTTON_VARIANT_OUTLINED} onClick={() => handleClick('text')}>
        text
      </Button>

      <Button variant={activeEditor === 'amp' ? BUTTON_VARIANT_CONTAINED : BUTTON_VARIANT_OUTLINED} onClick={() => handleClick('amp')}>
        amp
      </Button>
    </>
  )
}

export default EditorSelectorButtons
