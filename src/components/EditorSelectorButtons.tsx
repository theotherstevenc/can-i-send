import { Button } from '@mui/material'
import { useAppContext } from '../context/AppContext'
import { updateStore } from '../utils/updateStore'
import { EditorType } from '../types/types'
import { BTN_VARIANT_CONTAINED, BTN_VARIANT_OUTLINED, EDITOR_OPTION_AMP, EDITOR_OPTION_HTML, EDITOR_OPTION_TEXT } from '../utils/constants'

const API_URL = '/api/update-editor'
const HTTP_METHOD = 'POST'
const COLLECTION = 'config'
const DOCUMENT = 'editorSettings'
const ACTION = 'update'

const EditorSelectorButtons = () => {
  const { activeEditor, setActiveEditor } = useAppContext()

  const handleClick = (editorType: string) => {
    const firestoreObj = { activeEditor: editorType }

    setActiveEditor(editorType)
    updateStore(COLLECTION, DOCUMENT, ACTION, API_URL, HTTP_METHOD, firestoreObj)
  }

  const editorOptions: EditorType[] = [EDITOR_OPTION_HTML, EDITOR_OPTION_TEXT, EDITOR_OPTION_AMP]

  return (
    <>
      {editorOptions.map((editorOption) => {
        return (
          <Button key={editorOption} variant={activeEditor === editorOption ? BTN_VARIANT_CONTAINED : BTN_VARIANT_OUTLINED} onClick={() => handleClick(editorOption)}>
            {editorOption.toUpperCase()}
          </Button>
        )
      })}
    </>
  )
}

export default EditorSelectorButtons
