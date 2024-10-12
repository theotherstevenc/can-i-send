import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 8080
const bodyParserConfig = { limit: '50mb', extended: true }

import bodyParser from 'body-parser'
import cors from 'cors'
import CryptoJS from 'crypto-js'
import express from 'express'
import fileUpload from 'express-fileupload'
import nodemailer from 'nodemailer'
import { simpleParser } from 'mailparser'

const app = express()

app.use(bodyParser.urlencoded(bodyParserConfig))
app.use(bodyParser.json(bodyParserConfig))
app.use(cors({ origin: '*' }))
app.use(express.static('build'))
app.use(fileUpload())

const encryptText = (text, key) => {
  return CryptoJS.AES.encrypt(text, key).toString()
}

const decryptText = (encryptedData) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, process.env.ENCRYPTION_KEY)
  return decrypted.toString(CryptoJS.enc.Utf8)
}

app.post('/api/encrypt', async (req, res) => {
  try {
    const { text } = req.body
    if (!text) {
      return res.status(400).json({ error: 'Text is required' })
    }
    if (!process.env.ENCRYPTION_KEY) {
      return res.status(500).json({ error: 'Missing credentials' })
    }
    const encrypted = encryptText(text, process.env.ENCRYPTION_KEY)
    res.json({ encrypted })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/api/send', (req, res) => {
  const { testaddress, testsubject, ampversion, textversion, htmlversion } = req.body

  const user = req.body.user || process.env.MAIL_USERNAME
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).send({ success: false })
    } else {
      res.status(200).send({ success: true })
    }
  })
})

const validateFileUpload = (req, res) => {
  if (!req.files || !req.files.file) {
    res.status(400).send('No file uploaded.')
    return false
  }
  return true
}

const parseFile = async (file) => {
  const parsed = await simpleParser(file.data)
  return {
    html: parsed.html || '',
    text: parsed.text || '',
    amp: parsed.amp || '',
  }
}

app.post('/api/upload', async (req, res) => {
  if (!validateFileUpload(req, res)) return

  const file = req.files.file
  const parsedContent = await parseFile(file)

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
`),
)
