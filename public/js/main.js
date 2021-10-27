// enables width adjustments
Split(['#content', '#preview']);

// initialize html editor
var htmlEditor = CodeMirror.fromTextArea(document.getElementById('htmlversion'), {
  lineNumbers: true,
  mode: 'htmlmixed',
  lineWrapping: true,
  foldGutter: true,
  tabSize: 2,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
});

// initialize amp editor
var ampEditor = CodeMirror.fromTextArea(document.getElementById('ampversion'), {
  lineNumbers: true,
  mode: 'htmlmixed',
  tabSize: 2,
  lineWrapping: true
});

// initialize text editor
var textEditor = CodeMirror.fromTextArea(document.getElementById('textversion'), {
  lineNumbers: true,
  mode: 'htmlmixed',
  tabSize: 2,
  lineWrapping: true
});

// tabs and navigation
function mime(evt, mime) {
  let i, editors, tabs, previews;

  tabs = document.getElementsByClassName('tabs');
    for (i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(` active`, ``);
    }
  evt.currentTarget.className += ' active';

  editors = document.getElementsByClassName('editorwindow');
    for (i = 0; i < editors.length; i++) {
      editors[i].className = editors[i].className.replace(' editor-on', '');
    }
  document.getElementById(`${mime}`).className += ' editor-on';

  previews = document.getElementsByClassName(`previews`);
    for (i = 0; i < previews.length; i++) {
      previews[i].className = previews[i].className.replace(' preview-on', '');
    }

// refresh initially hidden editors
  document.querySelector(`.previews.${mime}`).className += ' preview-on';
    ampEditor.refresh()
    textEditor.refresh()
}

// layout the session object
var session = {
  editor: {
    html: '', amp: '', text: ''
  },
  settings: {
    address: '', display: '', subject: '',
    host: '', port: '', email: '',
    from: '', pass: '', fontsize: ''
  },
}

// initialize editor session to avoid bugs
Object.keys(session.editor).forEach((key, index) => {
  if (sessionStorage.getItem(`_SESSION_${key}`) == null) {
    sessionStorage.setItem(`_SESSION_${key}`, '')
  }
})

// update preview with values from html editor
function htmlPreview(){
  session.editor.html = htmlEditor.getValue()
  sessionStorage.setItem('_SESSION_html', session.editor.html)
	var preview = document.querySelector('.htmlframe').contentDocument;
	preview.open();
	preview.write(htmlEditor.getValue());
	preview.close();
}
htmlEditor.on('change', htmlPreview)

// update preview with values from amp editor
function ampPreview(){
  session.editor.amp = ampEditor.getValue()
  sessionStorage.setItem('_SESSION_amp', session.editor.amp)
	var preview = document.querySelector('.ampframe').contentDocument;
	preview.open();
	preview.write(ampEditor.getValue());
	preview.close();
}
ampEditor.on('change', ampPreview)

// update preview with values from text editor
function textPreview(){
  session.editor.text = textEditor.getValue()
  sessionStorage.setItem('_SESSION_text', session.editor.text)
  document.querySelector('.textframe').innerHTML = sessionStorage.getItem(`_SESSION_text`)
}
textEditor.on('change', textPreview)

// save editor value in session
htmlEditor.setValue(sessionStorage.getItem(`_SESSION_html`))
ampEditor.setValue(sessionStorage.getItem(`_SESSION_amp`))
textEditor.setValue(sessionStorage.getItem(`_SESSION_text`))

// basic custom editor style settings
function customEditorSettings(key, val){
  if(key == 'fontsize') {
    $('.editor').css('font-size', sessionStorage.getItem(`_SESSION_${key}`))
  }
}

// set session values as they are entered
Object.keys(session.settings).forEach((key, index) => {
  $(`.setting-${key}`).on('input', function(){
    session.settings[key] = $(`.setting-${key}`).val()
    sessionStorage.setItem(`_SESSION_${key}`, session.settings[key])
    customEditorSettings(key, session.settings[key])
  })
})

// apply session values where applicable
Object.keys(session.settings).forEach((key, index) => {
  $(`.setting-${key}`).val(sessionStorage.getItem(`_SESSION_${key}`))
  customEditorSettings(key, session.settings[key])
})

// close button receives focus for quick close
document.querySelector(`button.success-btn`).focus();

// set the url of the theme to accomodate the local default
function themePath(x) {
  if(x == 'default') {
    themeUrl = '../public/css/'
  } else {
    themeUrl = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.0/theme/'
  }
  return themeUrl
}

// update stylesheet href, aaply theme to all editors, set session
function selectTheme() {
  var input = document.getElementById('select');
  var theme = input.options[input.selectedIndex].textContent;
  document.querySelector("#codemirror-theme").href = `${themePath(theme)}${theme}.css`
  htmlEditor.setOption('theme', theme);
  ampEditor.setOption('theme', theme);
  textEditor.setOption('theme', theme);
  session.settings.display = $('#select').val()
  sessionStorage.setItem('_SESSION_display', session.settings.display)
}

// remember the theme and apply to all editors
if(sessionStorage.getItem('_SESSION_display')) {
  var sessionTheme = sessionStorage.getItem('_SESSION_display');
    document.getElementById(`${sessionTheme}`).selected = true
    document.querySelector("#codemirror-theme").href = `${themePath(sessionTheme)}${sessionTheme}.css`
    htmlEditor.setOption("theme", sessionTheme);
    ampEditor.setOption("theme", sessionTheme);
    textEditor.setOption("theme", sessionTheme);
  }

// look into combining this with editor font size via function()
$('.setting-tabsize').on('input', function(){
  htmlEditor.setOption('tabSize', sessionStorage.getItem('_SESSION_tabsize'));
  ampEditor.setOption('tabSize', sessionStorage.getItem('_SESSION_tabsize'));
  textEditor.setOption('tabSize', sessionStorage.getItem('_SESSION_tabsize'));
})
