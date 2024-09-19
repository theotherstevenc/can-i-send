require('dotenv').config()

const PORT = process.env.PORT || 8080

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const nodemailer = require('nodemailer')
const htmlMinifier = require('html-minifier').minify
const fs = require('fs')
const fileUpload = require('express-fileupload')
const { simpleParser } = require('mailparser')

const app = express()

// Enable CORS + Allow all origins
const cors = require('cors')
app.use(cors({ origin: '*' }))

// Middleware Configuration
const bodyParserConfig = { limit: '50mb', extended: true }
app.use(bodyParser.urlencoded(bodyParserConfig))
app.use(bodyParser.json(bodyParserConfig))
app.use(fileUpload())

const _env = {
  body: {
    email: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASS,
    from: process.env.MAIL_FROM_NAME,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
  },
}

app.post('/api/send', (req, res) => {
  const { preventThreading, minifyHTML, testaddress, testsubject, ampversion, textversion, htmlversion } = req.body

  // Validate request body
  if (!testaddress || !testsubject || !htmlversion) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const minifiedHTML = minifyHTML
    ? htmlMinifier(htmlversion, {
        collapseWhitespace: true,
        minifyCSS: true,
      })
    : htmlversion

  const email = _env.body.email || req.body.email
  const pass = _env.body.pass || req.body.pass
  const from = _env.body.from || req.body.from
  const host = _env.body.host || req.body.host
  const port = _env.body.port || req.body.port

  const transportObj = {
    host: host,
    port: port,
    secure: false,
    auth: {
      user: email,
      pass: pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  }

  const transporter = nodemailer.createTransport(transportObj)

  const appendUniqueSubject = () => {
    if (!preventThreading) return ''
    const d = new Date()
    const date = ('0' + d.getUTCDate()).slice(-2)
    const month = ('0' + (d.getUTCMonth() + 1)).slice(-2)
    const year = d.getUTCFullYear()
    const hours = ('0' + d.getUTCHours()).slice(-2)
    const mins = ('0' + d.getUTCMinutes()).slice(-2)
    const secs = ('0' + d.getUTCSeconds()).slice(-2)
    const dateStr = `${year}${month}${date} [${hours}:${mins}:${secs}]`
    return dateStr
  }

  const mailOptions = {
    from: `"${from}" <${email}>`,
    to: testaddress,
    subject: `${testsubject}${appendUniqueSubject()}`,
    html: htmlversion,
    text: textversion,
    amp: ampversion,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).send({ success: false })
      console.log(error)
    } else {
      res.status(200).send({ success: true })
      console.log('Message sent: %s', info.messageId)
    }
  })
})

app.post('/api/upload', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No file uploaded.')
  }

  const file = req.files.file
  const parsed = await simpleParser(file.data)

  const html = parsed.html || ''
  const text = parsed.text || ''
  const amp = parsed.amp || ''

  res.json({ html, text, amp })
})

app.listen(PORT, () =>
  console.log(`
 _____ _____ _____ _____ __
| __  |   __| __  |   __|  |
|    -|   __| __ -|   __|  |__
|__|__|_____|_____|_____|_____|
made with ❤ by a 𝗥𝗘𝗕𝗘𝗟
Server started...
http://localhost:${PORT}
`)
)

app.use(express.static('build'))
