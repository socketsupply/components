const Tonic = require('@conductorlab/tonic')
const components = require('../..')

components(Tonic)

function ready () {
  Tonic.init()

  require('./badge')
  require('./button')
  require('./chart')
  require('./checkbox')
  require('./dialog')
  require('./icon')
  require('./input')
  require('./panel')
  require('./popover')
  require('./progressbar')
  require('./profileimage')
  require('./range')
  require('./router')
  require('./select')
  require('./tabs')
  require('./textarea')
  require('./toaster')
  require('./toasterinline')
  require('./toggle')
  require('./tooltip')
  require('./windowed')

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
