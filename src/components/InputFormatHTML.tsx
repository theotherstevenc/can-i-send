import FormatPaintIcon from '@mui/icons-material/FormatPaint'
import { INPUT_FORMAT_HTML_LABEL } from '../utils/constants'
import { useEditorContext } from '../context/EditorContext'
import { useAppContext } from '../context/AppContext'
import { StyledIconButton } from './InputIconButton'
import { Tooltip } from '@mui/material'
import { logError } from '../utils/logError'
import prettier from 'prettier/standalone'
import parserHtml from 'prettier/plugins/html'
import parserPostcss from 'prettier/plugins/postcss'

const InputFormatHTML = () => {
  const { html, setHtml } = useEditorContext()
  const { isMinifyEnabled } = useAppContext()

  const handleClick = async () => {
    if (isMinifyEnabled) {
      logError('Formatting is disabled when minification is enabled', 'InputFormatHTML')
      return
    }
    try {
      const formattedHtml = await prettier.format(html, {
        parser: 'html',
        plugins: [parserHtml, parserPostcss],
        printWidth: 120,
        tabWidth: 1,
        useTabs: false,
        bracketSameLine: true,
        singleAttributePerLine: false,
      })

      setHtml(formattedHtml)
    } catch (error) {
      logError('Failed to format HTML:', 'InputFormatHTML', error)
    }
  }
  return (
    <>
      <Tooltip title={INPUT_FORMAT_HTML_LABEL}>
        <StyledIconButton onClick={handleClick} aria-label={INPUT_FORMAT_HTML_LABEL}>
          <FormatPaintIcon />
        </StyledIconButton>
      </Tooltip>
    </>
  )
}
export default InputFormatHTML
