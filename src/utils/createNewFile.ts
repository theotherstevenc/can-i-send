import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { ERROR_CREATING_NEW_FILE, ERROR_PARSING_DATA } from './constants'

export const createNewFile = async (
  fileName: string,
  boilerPlateMarkup: { html: string; text: string; amp: string },
  isBoilerplateApplied: boolean,
  setWorkingFileID: (id: string) => void,
  setWorkingFileName: (name: string) => void,
  setHtml: (html: string) => void,
  setText: (text: string) => void,
  setAmp: (amp: string) => void
) => {
  try {
    const requestBody: { fileName: string; boilerPlateMarkup?: string } = { fileName }

    if (isBoilerplateApplied) {
      requestBody.boilerPlateMarkup = JSON.stringify(boilerPlateMarkup)
    }

    const reqFileName = requestBody.fileName
    const reqBoilerPlateMarkup = requestBody.boilerPlateMarkup

    let parsedBoilerPlateMarkup: { html?: string; text?: string; amp?: string } = {}

    if (reqBoilerPlateMarkup) {
      try {
        parsedBoilerPlateMarkup = JSON.parse(reqBoilerPlateMarkup)
      } catch (error) {
        console.error(ERROR_PARSING_DATA, error)
      }
    }

    const newFileData = {
      fileName: reqFileName,
      html: parsedBoilerPlateMarkup.html || '',
      text: parsedBoilerPlateMarkup.text || '',
      amp: parsedBoilerPlateMarkup.amp || '',
      createdAt: new Date().toISOString(),
    }

    const newFileRef = await addDoc(collection(db, 'workingFiles'), newFileData)

    setWorkingFileID(newFileRef.id)
    setWorkingFileName(newFileData.fileName)
    setHtml(newFileData.html || '')
    setText(newFileData.text || '')
    setAmp(newFileData.amp || '')
  } catch (error) {
    console.error(ERROR_CREATING_NEW_FILE, error)
    return false
  }
}
