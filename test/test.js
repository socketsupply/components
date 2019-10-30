const Tonic = require('@optoolco/tonic')
const components = require('..')

components(Tonic)

function ready () {
  require('../src/router/test')
  require('../src/panel/test')
  require('../src/dialog/test')
  require('../src/tabs/test')
  require('../src/windowed/test')
  require('../src/tooltip/test')
  require('../src/popover/test')
  require('../src/badge/test')
  require('../src/button/test')
  require('../src/charts/test')
  require('../src/checkbox/test')
  require('../src/icon/test')
  require('../src/input/test')
  require('../src/progress-bar/test')
  require('../src/profile-image/test')
  require('../src/range/test')
  require('../src/select/test')
  require('../src/textarea/test')
  require('../src/toaster/test')
  require('../src/toaster-inline/test')
  require('../src/toggle/test')

  document.addEventListener('keydown', e => {
    if (e.keyCode === 9) {
      document.body.classList.add('show-focus')
    }
  })

  document.addEventListener('click', e => {
    document.body.classList.remove('show-focus')
  })
}

document.addEventListener('DOMContentLoaded', ready)
