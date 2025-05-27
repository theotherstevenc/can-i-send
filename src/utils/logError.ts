export const logError = (message: string, file: string, error: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${file}] [${message}]`, error)
  } else {
    console.error(`An error occurred. Please try again later.`)
  }
}
