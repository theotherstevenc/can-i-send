# can i send
A customizable app for sending test emails with various MIME types. This was specifically built with sending **AMP for Email** in mind. 

[can-i-send.herokuapp.com](https://can-i-send.herokuapp.com)

> In order to work on Heroku, credentials must be provided during each session, which can be easily managed in the settings modal. Read more below, in regard to credentials and usage.

## The current mime type order is:
1. HTML
2. TEXT
3. AMP

## Installation
* Clone [can-i-send](https://github.com/theotherstevenc/can-i-send)
* Navigate to the repo locally in terminal
* Run `npm i` to download and install `node_modules` and `dependencies`

## Running locally
* Navigate to the repo locally in terminal
* Run `node app.js` to start the server
* Open [localhost:1999](http://localhost:1999) in the browser
> The server will need to be restarted after any edits are made to the app.js.

## Credentials

### Gmail SMTP
* Requires a Google App Password. Instructions on how to generate an app password can be found at [Google Account Help](https://support.google.com/accounts/answer/185833)

* **Tip:** Two factor authentication is required in order to generate the App Password, and may be disabled after generating the App Password

* **Tip:** Test with a new Gmail account

### Other transports
* Will update once other transports are tested / added

## Credential Options
1. If running the app locally, login credentials can be stored in a manually created `.env` file, and saved in the root directory of the repo. [Reference the example env here](https://github.com/theotherstevenc/can-i-send/blob/master/.env.example). These values can be hardcoded as well in `app.js`, that's up to you.
2. There is also a settings modal that can be used to store credentials in javascript session. Note, the `.env` file will override any values in the settings modal. If using the remote Heroku app, credentials are required for each session.

> Option 2 is obviously not super secure. The password and other credentials will be visible in the browser `dev tools > application tab`. However, once the browser window/tab is closed, the credentials are removed and will need to be re-entered.
