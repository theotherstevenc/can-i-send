export const createNewFile = async (
  fileName: string,
  boilerPlateMarkup: { html: string; text: string; amp: string },
  isBoilerplateApplied: boolean,
  setWorkingFileID: (id: string) => void,
  setWorkingFileName: (name: string) => void,
  setHtml: (html: string) => void,
  setText: (text: string) => void,
  setAmp: (amp: string) => void,
  setTriggerFetch: (value: React.SetStateAction<boolean>) => void
): Promise<boolean> => {
  try {
    const requestBody: { fileName: string; boilerPlateMarkup?: string } = { fileName }

    if (isBoilerplateApplied) {
      requestBody.boilerPlateMarkup = JSON.stringify(boilerPlateMarkup)
    }

    const response = await fetch('/api/create-new-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const responseData = await response.json()

    if (response.ok) {
      setWorkingFileID(responseData.id)
      setWorkingFileName(fileName)
      setHtml(boilerPlateMarkup.html || '')
      setText(boilerPlateMarkup.text || '')
      setAmp(boilerPlateMarkup.amp || '')
      setTriggerFetch((prev) => !prev)

      return true
    } else {
      console.error('Error creating file:', responseData)
      return false
    }
  } catch (error) {
    console.error('Error:', error)
    return false
  }
}
