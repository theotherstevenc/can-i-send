
const sendFiles = async () => {

  const myFiles = document.querySelector('#setting-eml').files // create a FileList object. used to access the list of selected files on the file input 
  const formData = new FormData() // construct a form data object 

  // populate the forData obj with the form's current keys/values: 
  // name property as key
  // submitted value for value
  // it auto encodes file input content  
  Object.keys(myFiles).forEach(key => {
    formData.append(myFiles.item(key).name, myFiles.item(key))
  })

  // send formData object to server endpoint
  const response = await fetch('/upload', {
    method: 'POST',
    body: formData,
  })

  // assign the processed data to a variable
  const json = await response.json()

  // set storage + editor values
  // this can be simplified, for now leave as single statements

  sessionStorage.setItem('_SESSION_html', json.output.htmlVersion)
  htmlEditor.setValue(json.output.htmlVersion)
  
  sessionStorage.setItem('_SESSION_text', json.output.textVersion)
  textEditor.setValue(json.output.textVersion)
  
  sessionStorage.setItem('_SESSION_amp', json.output.ampVersion)
  ampEditor.setValue(json.output.ampVersion)
  
}

document.querySelector('#setting-eml').addEventListener('change', () => {
  sendFiles() 
})