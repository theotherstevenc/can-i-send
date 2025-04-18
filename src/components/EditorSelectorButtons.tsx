import { Button } from '@mui/material'
import { useAppContext } from '../context/AppContext'
import { updateStore } from '../utils/updateStore'

const BUTTON_VARIANT_OUTLINED = 'outlined'
const BUTTON_VARIANT_CONTAINED = 'contained'

const EditorSelectorButtons = () => {
  const { activeEditor, setActiveEditor } = useAppContext()

  const handleClick = (editorType: string) => {
    const API_URL = '/api/update-editor'
    const HTTP_METHOD = 'POST'
    const COLLECTION = 'config'
    const DOCUMENT = 'editorSettings'
    const ACTION = 'update'
    const firestoreObj = { activeEditor: editorType }

    setActiveEditor(editorType)
    updateStore(COLLECTION, DOCUMENT, ACTION, API_URL, HTTP_METHOD, firestoreObj)
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
