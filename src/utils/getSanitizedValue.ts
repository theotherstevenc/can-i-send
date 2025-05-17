import DOMPurify from 'dompurify'
import { EDITOR_OPTION_TEXT } from './constants'
const rootColorScheme = `
  <style>
    :root { 
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    .pre {
      white-space: pre-wrap;
    }
  </style>
`

const getSanitizedValue = (editor: { type: string; value: string }): string => {
  if (editor.type === EDITOR_OPTION_TEXT) {
    return rootColorScheme + '<pre class=pre>' + DOMPurify.sanitize(editor.value) + '</pre>'
  }
  return DOMPurify.sanitize(editor.value)
}

export default getSanitizedValue
