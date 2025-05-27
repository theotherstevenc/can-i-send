import { db } from '../firebase'
import { EditorType } from '../types/types'
import { useAppContext } from '../context/AppContext'
import { logError } from '../utils/logError'
import { Button } from '@mui/material'
import { updateFirestoreDoc } from '../utils/updateFirestoreDoc'
import { BTN_VARIANT_CONTAINED, BTN_VARIANT_OUTLINED, EDITOR_OPTION_AMP, EDITOR_OPTION_HTML, EDITOR_OPTION_TEXT } from '../utils/constants'

const COLLECTION = 'config'
const DOCUMENT = 'editorSettings'

const EditorSelectorButtons = () => {
  const { activeEditor, setActiveEditor } = useAppContext()

  const handleClick = async (editorType: string) => {
    const firestoreObj = { activeEditor: editorType }

    try {
      await updateFirestoreDoc(db, COLLECTION, DOCUMENT, firestoreObj)
      setActiveEditor(editorType)
    } catch (error) {
      logError('Unable to set active editor', 'EditorSelectorButtons.tsx', error)
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
