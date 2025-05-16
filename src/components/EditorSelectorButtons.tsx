import { Button } from '@mui/material'
import { useAppContext } from '../context/AppContext'
import { EditorType } from '../types/types'
import { BTN_VARIANT_CONTAINED, BTN_VARIANT_OUTLINED, EDITOR_OPTION_AMP, EDITOR_OPTION_HTML, EDITOR_OPTION_TEXT } from '../utils/constants'
import { db } from '../firebase'
import { updateFirestoreDoc } from '../utils/updateFirestoreDoc'

const COLLECTION = 'config'
const DOCUMENT = 'editorSettings'

const EditorSelectorButtons = () => {
  const { activeEditor, setActiveEditor } = useAppContext()

  const handleClick = (editorType: string) => {
    const firestoreObj = { activeEditor: editorType }

    setActiveEditor(editorType)
    updateFirestoreDoc(db, COLLECTION, DOCUMENT, firestoreObj)
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
