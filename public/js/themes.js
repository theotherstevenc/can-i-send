const themes = [
  {name:'default'},
  {name:'3024-day'},
  {name:'3024-night'},
  {name:'abcdef'},
  {name:'ambiance'},
  {name:'ayu-dark'},
  {name:'ayu-mirage'},
  {name:'base16-dark'},
  {name:'base16-light'},
  {name:'bespin'},
  {name:'blackboard'},
  {name:'cobalt'},
  {name:'colorforth'},
  {name:'darcula'},
  {name:'dracula'},
  {name:'duotone-dark'},
  {name:'duotone-light'},
  {name:'eclipse'},
  {name:'elegant'},
  {name:'erlang-dark'},
  {name:'gruvbox-dark'},
  {name:'hopscotch'},
  {name:'icecoder'},
  {name:'idea'},
  {name:'isotope'},
  {name:'lesser-dark'},
  {name:'liquibyte'},
  {name:'lucario'},
  {name:'material'},
  {name:'material-darker'},
  {name:'material-palenight'},
  {name:'material-ocean'},
  {name:'mbo'},
  {name:'mdn-like'},
  {name:'midnight'},
  {name:'monokai'},
  {name:'moxer'},
  {name:'neat'},
  {name:'neo'},
  {name:'night'},
  {name:'nord'},
  {name:'oceanic-next'},
  {name:'panda-syntax'},
  {name:'paraiso-dark'},
  {name:'paraiso-light'},
  {name:'pastel-on-dark'},
  {name:'railscasts'},
  {name:'rubyblue'},
  {name:'seti'},
  {name:'shadowfox'},
  {name:'solarized-dark'},
  {name:'solarized-light'},
  {name:'the-matrix'},
  {name:'tomorrow-night-bright'},
  {name:'tomorrow-night-eighties'},
  {name:'ttcn'},
  {name:'twilight'},
  {name:'vibrant-ink'},
  {name:'xq-dark'},
  {name:'xq-light'},
  {name:'yeti'},
  {name:'yonce'},
  {name:'zenburn'}
]




var options = themes.map((x, index) =>
`
<option id="${x.name}">${x.name}</option>

`).join('')

document.querySelector('#select').innerHTML = `
  <option selected disabled>choose theme</option>
  ${options}
`;
