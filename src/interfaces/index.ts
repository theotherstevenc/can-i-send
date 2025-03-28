export interface SenderSettings {
  host: string
  port: string
  username: string
  pass: string
  from: string
}

export interface EmailData {
  testaddress: string[]
  testsubject: string
  htmlversion: string
  textversion: string
  ampversion: string
  host: string
  port: string
  username: string
  pass: string
  from: string
}
