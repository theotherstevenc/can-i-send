require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path')
const nodemailer = require('nodemailer');
const app = express();
const minify = require('html-minifier').minify;

const fs = require('fs')
const fileUpload = require('express-fileupload')
const emlParser = require('eml-parser');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(
  fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    limits: {
      fileSize: 200000
    }
  })
);

app.post('/upload', (req, res) => {

  const uploadedFileExt = path.extname(req.files.uploadKey.name)
  const allowlist = ['.eml']
  let ampVersion = ''

  if(!allowlist.includes(uploadedFileExt)) {
    return res.status(422)
  }
  // todo: add UI messaging to indicate error

  new emlParser(fs.createReadStream(req.files.uploadKey.tempFilePath))
    .parseEml()
    .then(result  => {

    if((result.attachments.length > 0) && result.attachments[0].contentType.includes('x-amp-html')) {
      ampVersion = result.attachments[0].content.toString()
    }
    
    const output = {
      htmlVersion: result.html,
      textVersion: result.text,
      ampVersion: ampVersion
    } 

    return res.json({
      output: output,
      status:'success', 
      message: Object.keys(req.files).toString(),
    })

  })
  .catch(err  => {
    console.log(err);
  })
})

const _env = {
  body: {
    email: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASS,
    from: process.env.MAIL_FROM_NAME,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
  }
}

app.get('/', (req,res) =>{
  res.render('home', {_env});
});

app.post('/', (req, res) => {
  const testaddress = req.body.testaddress;
  const testsubject = req.body.testsubject;
  const ampversion = req.body.ampversion;
  const textversion = req.body.textversion;
  const htmlversion = (() => {

    if(req.body.minifyHTML !== '_session_on-minify') return req.body.htmlversion

    let markup = minify(req.body.htmlversion, {
      collapseWhitespace:true,
      minifyCSS:true,
    })
    return markup

  })();


  let email = _env.body.email || req.body.email
  let pass  = _env.body.pass || req.body.pass
  let from  = _env.body.from || req.body.from
  let host  = _env.body.host || req.body.host
  let port  = _env.body.port || req.body.port

  let transportObj = {
    host: host,
    port: port,
    secure: false,
    auth: {
        user: email,
        pass: pass
    },
    tls:{
      rejectUnauthorized:false
    }
  }

  let transporter = nodemailer.createTransport(transportObj);

  function appendUniqueSubject(val) {
    if(val !== '_session_on-thread') return
      let d = new Date();
        let date = ('0' + d.getUTCDate() + 1).slice(-2)
        let month = ('0' + d.getUTCMonth() + 1).slice(-2)
        let year = d.getUTCFullYear()
        let hours = d.getUTCHours()
        let mins = d.getUTCMinutes()
        let secs = d.getUTCSeconds()
        let dateStr = ` ${year}${month}${date} [${hours}:${mins}:${secs}]`
          return dateStr
  }

  let mailOptions = {
    from: `"${from}" <${email}>`,
    to: testaddress,
    subject: `${testsubject}${appendUniqueSubject(req.body.preventThreading)}`,
    html: htmlversion,
    text: textversion,
    amp: ampversion,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        res.render('home', {sendFailure:true, sendSuccess:false});
    } else {
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
        res.render('home', {sendSuccess:true,sendFailure:false});
      }
  });

});

//port can be changed
let port = process.env.PORT;
if (port == null || port == "") {
  port = 1999;
}

//app.listen(port);
app.listen(port, () => console.log(`
 _____ _____ _____ _____ __
| __  |   __| __  |   __|  |
|    -|   __| __ -|   __|  |__
|__|__|_____|_____|_____|_____|
made with ❤ by a 𝗥𝗘𝗕𝗘𝗟
Server started...
http://localhost:1999
` ));
