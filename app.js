require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path')
const nodemailer = require('nodemailer');
const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/public', express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(bodyParser.json())
app.use(bodyParser.json({limit: '50mb'}));
app.get('/', (req,res) =>{
  res.render('home');
});

app.post('/', (req, res) => {
  const testaddress = req.body.testaddress;
  const testsubject = req.body.testsubject;
  const textversion = req.body.textversion;
  const htmlversion = req.body.htmlversion;
  const ampversion = req.body.ampversion;
  const preventThreading = req.body.preventThreading;

  if ('MAIL_EMAIL' in process.env){ var email = process.env.MAIL_EMAIL }
  else { var email = req.body.email; }

  if ('MAIL_PASS' in process.env){ var pass = process.env.MAIL_PASS }
  else { var pass = req.body.pass;   }

  if ('MAIL_FROM_NAME' in process.env){ var from = process.env.MAIL_FROM_NAME }
  else { var from = req.body.from; }

  if ('MAIL_HOST' in process.env){ var host = process.env.MAIL_HOST }
  else { var host = req.body.host; }

  if ('MAIL_PORT' in process.env){ var port = process.env.MAIL_PORT }
  else { var port = req.body.port; }

  let transporter = nodemailer.createTransport({
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
  });

  function appendUniqueSubject(val) {
    if(val == 'yes') {
      let d = new Date();
      let date = d.getUTCDate()
      let month = d.getUTCMonth() + 1
      let year = d.getUTCFullYear()
      let hours = d.getUTCHours()
      let mins = d.getUTCMinutes()
      let secs = d.getUTCSeconds()
      let dateStr = ` ${year}${month}${date} [${hours}:${mins}:${secs}]`
      return dateStr
    } else {
      return ''
    }
  }

  let mailOptions = {
    from: `"${from}" <${email}>`,
    to: testaddress,
    subject: `${testsubject}${appendUniqueSubject(preventThreading)}`,
    html: htmlversion,
    text: textversion,
    amp: ampversion,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('home', {sent:true});
  });

});

//port can be changed
let port = process.env.PORT;
if (port == null || port == "") {
  port = 9999;
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
