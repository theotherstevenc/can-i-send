export const boilerPlateMarkup = {
  html: `
  <!DOCTYPE html>
  <html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>Email</title>
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <![endif]-->
    <style>
      :root {
        color-scheme: light dark;
        supported-color-schemes: light dark;
      }
    </style>
  </head>
  <body class="body" xml:lang="en">
    <div role="article" aria-roledescription="email" aria-label="email name" lang="en" dir="ltr" style="font-size:medium; font-size:max(16px, 1rem)">
      <!-- email content in here -->
    </div>
  </body>
</html>
  `,
  text: `Default plain text version`,
  amp: `
  <!doctype html>
  <html ⚡4email data-css-strict>
    <head>
      <meta charset="utf-8">
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      <style amp4email-boilerplate>body{visibility:hidden}</style>
    </head>
    <body>
      AMP4EMAIL
    </body>
  </html>
`,
}
