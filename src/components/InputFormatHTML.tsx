import beautify from 'js-beautify'
import CodeIcon from '@mui/icons-material/Code'
import { INPUT_FORMAT_HTML_LABEL } from '../utils/constants'
import { useEditorContext } from '../context/EditorContext'
import { useAppContext } from '../context/AppContext'
import { StyledIconButton } from './InputIconButton'
import { Tooltip } from '@mui/material'
import { logError } from '../utils/logError'

const InputFormatHTML = () => {
  const { html, setHtml } = useEditorContext()
  const { isMinifyEnabled } = useAppContext()

  const handleClick = async () => {
    if (isMinifyEnabled) {
      logError('Formatting is disabled when minification is enabled', 'InputFormatHTML')
      return
    }
    try {
      const formattedHtml = beautify.html(html, {
        indent_size: 1,
        max_preserve_newlines: 1,
        preserve_newlines: true,
        wrap_line_length: 120,
      })

      setHtml(formattedHtml)
    } catch (error) {
      logError('Failed to format HTML:', 'InputFormatHTML', error)
    }
  }
  return (
    <Tooltip title={INPUT_FORMAT_HTML_LABEL}>
      <StyledIconButton onClick={handleClick} aria-label={INPUT_FORMAT_HTML_LABEL}>
        <CodeIcon />
      </StyledIconButton>
    </Tooltip>
  )
}
export default InputFormatHTML
