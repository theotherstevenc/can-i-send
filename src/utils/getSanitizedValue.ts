import DOMPurify from 'dompurify'
import { EDITOR_OPTION_TEXT } from './constants'

const getSanitizedValue = (editor: { type: string; value: string }): string => {
  if (editor.type === EDITOR_OPTION_TEXT) {
    return '<pre>' + DOMPurify.sanitize(editor.value) + '</pre>'
  }
  return DOMPurify.sanitize(editor.value)
}

export default getSanitizedValue
