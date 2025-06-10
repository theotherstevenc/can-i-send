import { EDITOR_OPTION_AMP, EDITOR_OPTION_HTML, EDITOR_OPTION_TEXT } from '../utils/constants'

export type EditorType = typeof EDITOR_OPTION_HTML | typeof EDITOR_OPTION_TEXT | typeof EDITOR_OPTION_AMP
