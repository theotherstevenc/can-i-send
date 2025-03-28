/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@mui/material'
import { useAppContext } from '../context/AppContext'
import manageFirestoreCollection from '../utils/manageFirestoreCollection'

const BUTTON_VARIANT_OUTLINED = 'outlined'
const BUTTON_VARIANT_CONTAINED = 'contained'

const EditorSelectorButtons = () => {
  const { activeEditor, setActiveEditor } = useAppContext()

  const handleClick = (editorType: string) => {
    setActiveEditor(editorType)
    manageFirestoreCollection({ activeEditor: editorType })
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
