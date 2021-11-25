# can i send
A customizable app for sending test emails with various MIME types. This was specifically built with sending `AMP` email in mind. **Make sure you whitelist your from address in Gmail dynamic settings**

## The current mime type order is:
1. HTML
2. TEXT
3. AMP

## Installation
* Clone or download [can-i-send](https://github.com/theotherstevenc/can-i-send)
* Navigate to the repo locally in terminal
* Run command `npm install` to download and install `node_modules` and `dependencies`

## Usage

### Online
This has been deployed and is available online as a Heroku App. In order to work, credentials must be added during each session. This can be managed in the settings modal. Read more below, in regard to credentials and usage.
[can-i-send.herokuapp.com](https://can-i-send.herokuapp.com)

### Out of the box
* Navigate to the repo locally in terminal
* Run command `node app.js` to start the server
* Open [localhost:1999](http://localhost:1999) in the browser
> The server will need to be restarted after any edits are made to the app.js.

### Optional Usage

#### Install nodemon
* Navigate to the repo in locally terminal
* `npm install -g nodemon` (_this is a global install_)

#### Start server with nodemon
* Navigate to the repo in terminal
* Run command `nodemon app.js`
* Open [localhost:1999](http://localhost:1999) in the browser
> `nodemon` will refresh the server automatically after edits. use this instead of `node app.js` (this is mainly for development purposes)

## Credentials and transports for sending tests

### Gmail SMTP
* Requires a Google App Password. Instructions on how to generate an app password can be found at [Google Account Help](https://support.google.com/accounts/answer/185833)

* **Tip:** Two factor authentication is required in order to generate the App Password, and may be disabled after generating the App Password

* **Tip:** Test with a new Gmail account

### Other transports
* Will update once other transports are tested

## Credential Options
1. Login credentials can be stored in a `.env` file, which needs to be created manually, and saved in the root directory of the repo. [Reference the example env here](https://github.com/theotherstevenc/can-i-send/blob/master/.env.example). These values can be hardcoded as well in `app.js`, that's up to you.
2. There is also a settings modal that can be used to store credentials in javascript session. Note, the `.env` file will override any values in the settings modal.

> Option 2 is obviously not super secure. The password and other credentials will be visible in the browser `dev tools > application tab`. However, once the browser window/tab is closed, the credentials are removed and will need to be re-entered.
