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
const cors = require('cors')
const bodyParserConfig = { limit: '50mb', extended: true }

const app = express()

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded(bodyParserConfig))
app.use(bodyParser.json(bodyParserConfig))
app.use(fileUpload())

app.post('/api/send', (req, res) => {
  const {
    preventThreading,
    minifyHTML,
    testaddress,
    testsubject,
    ampversion,
    textversion,
    htmlversion,
  } = req.body

  const minifiedHTML = minifyHTML
    ? htmlMinifier(htmlversion, {
        collapseWhitespace: true,
        minifyCSS: true,
      })
    : htmlversion

  const user = req.body.username || process.env.MAIL_USERNAME
  const pass = req.body.password || process.env.MAIL_PASS
  const from = req.body.from || process.env.MAIL_FROM_NAME
  const host = req.body.host || process.env.MAIL_HOST
  const port = req.body.port || process.env.MAIL_PORT

  const transportObj = {
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
  }

  const transporter = nodemailer.createTransport(transportObj)

  const appendUniqueSubject = () => {
    if (!preventThreading) return ''
    const dateStr = new Date()
      .toISOString()
      .replace('T', ' ')
      .slice(0, 19)
      .replace(/-/g, '')
      .replace(/:/g, ':')
    return ' ' + dateStr
  }

  const mailOptions = {
    from: `"${from}" <${user}>`,
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
