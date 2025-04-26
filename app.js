import 'dotenv/config'
import basicAuth from 'express-basic-auth'
import bcrypt from 'bcrypt'
import CryptoJS from 'crypto-js'
import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'
import nodemailer from 'nodemailer'
import { simpleParser } from 'mailparser'

const PORT = process.env.PORT || 8080
const app = express()

import db from './firebase.js'

app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cors({ origin: '*' }))
app.use(express.static('build'))
app.use(fileUpload())

if (process.env.NODE_ENV === 'development') {
  console.warn('Basic authentication is disabled in development mode')
} else {
  const hashedPassword = bcrypt.hashSync(process.env.AUTH_PASS, 10)

  app.use(
    basicAuth({
      users: { [process.env.AUTH_USER]: process.env.AUTH_PASS },
      challenge: true,
      authorizeAsync: true,
      authorizer: (username, password, cb) => {
        const isValidUser = username === process.env.AUTH_USER
        const isValidPass = bcrypt.compareSync(password, hashedPassword)
        cb(null, isValidUser && isValidPass)
      },
    })
  )
}

app.post('/api/get-collection', async (req, res) => {
  const { COLLECTION, DOCUMENT } = req.body

  try {
    let settingsRef

    if (DOCUMENT) {
      settingsRef = db.collection(COLLECTION).doc(DOCUMENT)
      const doc = await settingsRef.get()

      if (!doc.exists) {
        return res.status(404).json({ error: 'Document not found: ' + COLLECTION })
      }

      return res.status(200).json(doc.data())
    } else {
      settingsRef = db.collection(COLLECTION)
      const snapshot = await settingsRef.get()

      if (snapshot.empty) {
        return res.status(200).json({ success: true, message: 'No projects' })
      }
      const documents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      return res.status(200).json(documents)
    }
  } catch (error) {
    console.error('Error retrieving Firestore collection:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/api/update-editor', async (req, res) => {
  try {
    const { DOCUMENT, COLLECTION, ACTION, firestoreObj } = req.body

    if (!DOCUMENT || !COLLECTION) {
      return res.status(400).json({ error: '[Firestore object], document, and collection fields are required' })
    }

    const settingsRef = db.collection(COLLECTION).doc(DOCUMENT)
    const doc = await settingsRef.get()

    if (!doc.exists) {
      return res.status(404).json({ error: 'Document not found' })
    }

    if (ACTION === 'delete') {
      await settingsRef.delete()
      return res.status(200).json({ success: true, message: 'Document deleted successfully' })
    }
    if (ACTION === 'update') {
      await settingsRef.update(firestoreObj)
      return res.status(200).json({ success: true, message: 'Document updated successfully' })
    }

    res.status(200).send({ success: true })
  } catch (error) {
    console.error('Error updating sender settings:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/api/create-new-file', async (req, res) => {
  try {
    const { fileName, boilerPlateMarkup } = req.body

    if (!fileName) {
      return res.status(400).json({ error: 'fileName is required' })
    }

    let parsedBoilerPlateMarkup = {}
    if (boilerPlateMarkup) {
      try {
        parsedBoilerPlateMarkup = JSON.parse(boilerPlateMarkup)
      } catch (error) {
        return res.status(400).json({ error: 'Invalid boilerPlateMarkup format' })
      }
    }

    const newFileData = {
      fileName,
      html: parsedBoilerPlateMarkup.html || '',
      text: parsedBoilerPlateMarkup.text || '',
      amp: parsedBoilerPlateMarkup.amp || '',
      createdAt: new Date().toISOString(),
    }

    const newFileRef = await db.collection('workingFiles').add(newFileData)

    return res.status(201).json({
      success: true,
      message: 'File successfully created',
      id: newFileRef.id,
    })
  } catch (error) {
    console.error('Error creating new file:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

const encryptText = (text, key) => {
  return CryptoJS.AES.encrypt(text, key).toString()
}

const decryptText = (encryptedData) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, process.env.ENCRYPTION_KEY)
  return decrypted.toString(CryptoJS.enc.Utf8)
}

app.post('/api/encrypt', async (req, res) => {
  const { text } = req.body

  if (!text) {
    return res.status(400).json({ error: 'Text is required' })
  }

  if (!process.env.ENCRYPTION_KEY) {
    return res.status(500).json({ error: 'Missing credentials' })
  }

  try {
    const encrypted = encryptText(text, process.env.ENCRYPTION_KEY)
    return res.json({ encrypted })
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/api/send', async (req, res) => {
  try {
    const { testaddress, testsubject, ampversion, textversion, htmlversion } = req.body
    const user = req.body.username || process.env.MAIL_USERNAME
    const pass = decryptText(req.body.pass) || process.env.MAIL_PASS
    const from = req.body.from || process.env.MAIL_FROM_NAME
    const host = req.body.host || process.env.MAIL_HOST
    const port = req.body.port || process.env.MAIL_PORT

    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: false,
      auth: {
        user: user,
        pass: pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    const mailOptions = {
      from: from + ' <' + user + '>',
      to: testaddress,
      subject: testsubject,
      html: htmlversion,
      text: textversion,
      amp: ampversion,
    }

    await transporter.sendMail(mailOptions)
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return res.status(500).json({ error: 'Internal Server Error.' })
  }
})

const ampVersion = (parsed) => {
  if (parsed && Array.isArray(parsed.attachments)) {
    const ampAttachment = parsed.attachments.find((attachment) => attachment.contentType === 'text/x-amp-html')
    if (ampAttachment) {
      return ampAttachment.content.toString()
    }
  }
}

const parseUpload = async (file) => {
  const parsed = await simpleParser(file.data)

  return {
    html: parsed.html || '',
    text: parsed.text || '',
    amp: ampVersion(parsed) || '',
  }
}

app.post('/api/upload', async (req, res) => {
  const file = req.files.file
  const parsedContent = await parseUpload(file)
  res.json(parsedContent)
})

app.listen(PORT, () =>
  console.log(`
  _____ _____ _____ _____ ____
  | __  |   __| __  |   __|  |
  |    -|   __| __ -|   __|  |__
  |__|__|_____|_____|_____|_____|
  made with ❤ by a 𝗥𝗘𝗕𝗘𝗟
  Server started...
  http://localhost:${PORT}
`)
)
