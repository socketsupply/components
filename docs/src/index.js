const Tonic = require('@optoolco/tonic')
const scrollToY = require('scrolltoy')
const { qs, qsa } = require('qsa-min')
const components = require('../..')
const nonce = require('./nonce')

components(Tonic)

if (window.location.pathname === '/examples.html') {
  require('../../router/readme')
  require('../../panel/readme')
  require('../../dialog/readme')
  require('../../form/readme')
  require('../../tabs/readme')
  require('../../windowed/readme')
  require('../../tooltip/readme')
  require('../../popover/readme')
  require('../../badge/readme')
  require('../../button/readme')
  require('../../chart/readme')
  require('../../checkbox/readme')
  require('../../icon/readme')
  require('../../input/readme')
  require('../../progress-bar/readme')
  require('../../profile-image/readme')
  require('../../range/readme')
  require('../../select/readme')
  require('../../textarea/readme')
  require('../../toaster/readme')
  require('../../toaster-inline/readme')
  require('../../toggle/readme')
}

function setupNavigation () {
  qsa(`a[name="${document.body.dataset.page}"]`).forEach(el => {
    el.classList.add('active')
  })

  const main = qs('main')
  const links = qsa('nav ul li a')
  const ranges = []
  let current

  links.map(link => {
    const id = link.getAttribute('href').slice(1)
    const section = document.getElementById(id)
    const { top } = section.getBoundingClientRect()

    ranges.push({
      upper: top,
      lower: top + section.offsetHeight,
      id: id,
      link: link
    })

    link.addEventListener('click', event => {
      event.preventDefault()

      const prev = qs('a.selected')
      if (prev) prev.className = ''
      link.className = 'selected'
      scrollToY(main, section.offsetTop, 500)
      window.location.hash = id
    })
  })

  function onscroll (event) {
    if (scrollToY.scrolling) return
    var pos = main.scrollTop

    pos = pos + 100

    ranges.map(range => {
      if (pos >= range.upper && pos <= range.lower) {
        if (range.id === current) return

        current = range.id
        var prev = qs('a.selected')
        if (prev) prev.className = ''
        range.link.className = 'selected'
      }
    })
  }
  main.addEventListener('scroll', onscroll)
}

function clearFocus () {
  document.addEventListener('keydown', e => {
    if (e.keyCode === 9) {
      document.body.classList.add('show-focus')
    }
  })

  document.addEventListener('click', e => {
    document.body.classList.remove('show-focus')
  })
}

function ready () {
  setupNavigation()
  clearFocus()

  components(Tonic, nonce)
}

document.addEventListener('DOMContentLoaded', ready)
