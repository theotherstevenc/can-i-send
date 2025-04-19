import { Button } from '@mui/material'
import { useAppContext } from '../context/AppContext'
import { updateStore } from '../utils/updateStore'
import { EditorType } from '../types/types'
import { BUTTON_VARIANT_CONTAINED, BUTTON_VARIANT_OUTLINED } from '../utils/constants'

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

  const editorTypes: EditorType[] = ['html', 'text', 'amp']

  return (
    <>
      {editorTypes.map((editorType) => {
        return (
          <Button key={editorType} variant={activeEditor === editorType ? BUTTON_VARIANT_CONTAINED : BUTTON_VARIANT_OUTLINED} onClick={() => handleClick(editorType)}>
            {editorType.toUpperCase()}
          </Button>
        )
      })}
    </>
  )
}

export default EditorSelectorButtons
