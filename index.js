const scrollToY = require('scrolltoy')
const main = document.querySelector('main')

const links = [].slice.call(document.querySelectorAll('nav ul li a'))
const ranges = []
let current

links.map(function (link) {
  const id = link.getAttribute('href').slice(1)
  const section = document.getElementById(id)

  ranges.push({
    upper: section.offsetTop,
    lower: section.offsetTop + section.offsetHeight,
    id: id,
    link: link
  })

  link.addEventListener('click', function (event) {
    event.preventDefault()

    const prev = document.querySelector('a.selected')
    if (prev) prev.className = ''
    link.className = 'selected'
    scrollToY(main, section.offsetTop, 1500)
  })
})

function onscroll (event) {
  var pos = main.scrollTop

  pos = pos + 100

  ranges.map(function (range) {
    if (pos >= range.upper && pos <= range.lower) {
      if (range.id === current) return

      current = range.id
      var prev = document.querySelector('a.selected')
      if (prev) prev.className = ''
      range.link.className = 'selected'
    }
  })
}

main.addEventListener('scroll', onscroll)
