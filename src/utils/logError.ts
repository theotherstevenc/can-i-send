export const logError = (message: string, file: string, error?: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    const errorToLog = error ?? '[no error details provided]'
    console.error(`[${message}] in [${file}]`, errorToLog)
  } else {
    console.error(`An error occurred. Please try again later.`)
  }
}
