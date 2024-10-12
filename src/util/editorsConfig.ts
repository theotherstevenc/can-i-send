import { EDITOR_TYPE } from './types'

export const getEditorsConfig = (
  html: string,
  setHtml: (html: string) => void,
  text: string,
  setText: (text: string) => void,
  amp: string,
  setAmp: (amp: string) => void
) => [
  {
    type: EDITOR_TYPE.HTML,
    language: 'html',
    value: html,
    onChange: (newValue: string | undefined) => setHtml(newValue || ''),
  },
  {
    type: EDITOR_TYPE.TEXT,
    language: 'text',
    value: text,
    onChange: (newValue: string | undefined) => setText(newValue || ''),
  },
  {
    type: EDITOR_TYPE.AMP,
    language: 'html',
    value: amp,
    onChange: (newValue: string | undefined) => setAmp(newValue || ''),
  },
]
