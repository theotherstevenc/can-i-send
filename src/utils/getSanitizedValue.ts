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

const escapeStr = (str: string): string => {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

const getSanitizedValue = (editor: { type: string; value: string }): string => {
  if (editor.type === EDITOR_OPTION_TEXT) {
    return rootColorScheme + '<pre class=pre>' + escapeStr(editor.value) + '</pre>'
  }
  return editor.value
}

export default getSanitizedValue
