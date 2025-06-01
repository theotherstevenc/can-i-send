export const customMinifier = (html: string): string => {
  return html
    .replace(/<!--\[if mso\]>[\s\S]*?<!\[endif\]-->/g, (match) => {
      return match.replace(/\n\s*/g, '')
    })
    .replace(/\n\s*/g, '')
    .replace(/>\s+</g, '><')
    .replace(/<!--(?!\[if mso\]).*?-->/g, '')
}
