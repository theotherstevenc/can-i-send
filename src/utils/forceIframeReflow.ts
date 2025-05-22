// Forces a reflow
// on the given iframe element
// to fix scrolling issues
// after resizing

const forceIframeReflow = (iframe: HTMLIFrameElement | null) => {
  if (!iframe) return
  iframe.style.display = 'none'
  void iframe.offsetHeight
  iframe.style.display = 'block'
}

export default forceIframeReflow
