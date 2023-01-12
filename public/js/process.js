
const sendFiles = async () => {

  const myFiles = document.querySelector('#setting-eml').files 
  const formData = new FormData()

  Object.keys(myFiles).forEach(key => {
    formData.append('uploadKey', myFiles.item(key))
  })

  const response = await fetch('/upload', {
    method: 'POST',
    body: formData,
  })

  const json = await response.json()

  sessionStorage.setItem('_SESSION_html', json.output.htmlVersion)
  htmlEditor.setValue(json.output.htmlVersion)
  
  sessionStorage.setItem('_SESSION_text', json.output.textVersion)
  textEditor.setValue(json.output.textVersion)
  
  sessionStorage.setItem('_SESSION_amp', json.output.ampVersion)
  ampEditor.setValue(json.output.ampVersion)
  
}

document.querySelector('#setting-eml').addEventListener('change', (e) => {
  e.preventDefault()
  sendFiles() 
})