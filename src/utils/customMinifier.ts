export const customMinifier = (html: string): string => {
  return html
    .replace(/<!--\[if mso\]>[\s\S]*?<!\[endif\]-->/g, (match) => {
      return match.replace(/\n\s*/g, '') // Remove newlines and leading whitespace within the conditional comments
    })
    .replace(/\n\s*/g, '') // Remove newlines and leading whitespace
    .replace(/>\s+</g, '><') // Remove whitespace between tags
    .replace(/<!--(?!\[if mso\]).*?-->/g, '') // Remove comments except conditional comments
}
