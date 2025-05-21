import { db } from '../firebase'
import { EditorType } from '../types/types'
import { useAppContext } from '../context/AppContext'
import { Button } from '@mui/material'
import { updateFirestoreDoc } from '../utils/updateFirestoreDoc'
import { BTN_VARIANT_CONTAINED, BTN_VARIANT_OUTLINED, EDITOR_OPTION_AMP, EDITOR_OPTION_ERROR, EDITOR_OPTION_HTML, EDITOR_OPTION_TEXT } from '../utils/constants'

const COLLECTION = 'config'
const DOCUMENT = 'editorSettings'

const EditorSelectorButtons = () => {
  const { activeEditor, setActiveEditor } = useAppContext()

  const handleClick = (editorType: string) => {
    const firestoreObj = { activeEditor: editorType }

    if (!firestoreObj) {
      return
    }

    try {
      setActiveEditor(editorType)
      updateFirestoreDoc(db, COLLECTION, DOCUMENT, firestoreObj)
    } catch (error) {
      console.error(EDITOR_OPTION_ERROR, error)
    }
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
