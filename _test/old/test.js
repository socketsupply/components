import { Tonic } from '@socketsupply/tonic'
import { Components } from '../..'

import 'tape.js'

Components(Tonic)

async function ready () {
  await import('../../router/test')
  await import('../../panel/test')
  await import('../../dialog/test')
  await import('../../tabs/test')
  await import('../../windowed/test')
  await import('../../tooltip/test')
  await import('../../popover/test')
  await import('../../badge/test')
  await import('../../button/test')
  await import('../../chart/test')
  await import('../../checkbox/test')
  await import('../../icon/test')
  await import('../../input/test')
  await import('../../progress-bar/test')
  await import('../../profile-image/test')
  await import('../../range/test')
  await import('../../select/test')
  await import('../../textarea/test')
  await import('../../toaster/test')
  await import('../../toaster-inline/test')
  await import('../../toggle/test')

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
