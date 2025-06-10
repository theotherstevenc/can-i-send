import FormatPaintIcon from '@mui/icons-material/FormatPaint'
import { useEditorContext } from '../context/EditorContext'
import { StyledIconButton } from './InputIconButton'
import { Tooltip } from '@mui/material'
import { logError } from '../utils/logError'
import prettier from 'prettier/standalone'
import parserHtml from 'prettier/plugins/html'

const InputFormatHTMLLabel = 'Format HTML'

const InputFormatHTML = () => {
  const { html, setHtml } = useEditorContext()

  const handleClick = async () => {
    try {
      const formattedHtml = await prettier.format(html, {
        parser: 'html',
        plugins: [parserHtml],
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
      <Tooltip title={InputFormatHTMLLabel}>
        <StyledIconButton onClick={handleClick} aria-label={InputFormatHTMLLabel}>
          <FormatPaintIcon />
        </StyledIconButton>
      </Tooltip>
    </>
  )
}
export default InputFormatHTML
