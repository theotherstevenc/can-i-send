import { Checkbox, FormControlLabel } from '@mui/material'
import useEditorContext from '../helpers/useEditorContext'

const FormControlLabels = () => {
  const { html, setHtml, minifyHTML, setMinifyHTML, wordWrap, setWordWrap, preventThreading, setPreventThreading, originalHtml, setOriginalHtml } =
    useEditorContext()

  const customMinifyHtml = (html: string): string => {
    return html
      .replace(/<!--\[if mso\]>[\s\S]*?<!\[endif\]-->/g, (match) => {
        return match.replace(/\n\s*/g, '') // Remove newlines and leading whitespace within the conditional comments
      })
      .replace(/\n\s*/g, '') // Remove newlines and leading whitespace
      .replace(/>\s+</g, '><') // Remove whitespace between tags
      .replace(/<!--(?!\[if mso\]).*?-->/g, '') // Remove comments except conditional comments
  }

  const handleMinifyHTML = (minify: boolean) => {
    setMinifyHTML(minify)
    if (minify) {
      setOriginalHtml(html)
      localStorage.setItem('originalHtml', html)
      setHtml(customMinifyHtml(html))
    } else {
      setHtml(localStorage.getItem('originalHtml') || originalHtml)
    }
  }

  return (
    <>
      <FormControlLabel
        control={<Checkbox checked={minifyHTML} onChange={(e) => handleMinifyHTML(e.target.checked)} name='minifyHTML' color='primary' />}
        label='Minify'
      />

      <FormControlLabel
        control={<Checkbox checked={wordWrap} onChange={(e) => setWordWrap(e.target.checked)} name='wordWrap' color='primary' />}
        label='Word wrap'
      />

      <FormControlLabel
        control={<Checkbox checked={preventThreading} onChange={(e) => setPreventThreading(e.target.checked)} name='preventThreading' color='primary' />}
        label='Prevent Threading'
      />
    </>
  )
}

export default FormControlLabels
