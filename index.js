const requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()

function ease (pos) {
  if ((pos /= 0.5) < 1) {
    return 0.5 * Math.pow(pos, 5)
  }
  return 0.5 * (Math.pow((pos - 2), 5) + 2)
}

let scrolling = false

function scrollToY (scrollTargetY, speed) {
  const scrollY = window.scrollY
  const pos = Math.abs(scrollY - scrollTargetY)
  const time = Math.max(0.1, Math.min(pos / speed, 0.8))

  let currentTime = 0

  function nextFrame () {
    currentTime += 1 / 60
    scrolling = true

    const p = currentTime / time
    const t = ease(p)

    if (p < 1) {
      requestAnimFrame(nextFrame)
      window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t))
    } else {
      window.scrollTo(0, scrollTargetY)
      scrolling = false
    }
  }
  nextFrame()
}

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
    scrollToY(section.offsetTop, 1500)
  })
})

function onscroll (event) {
  if (scrolling) return

  var pos = document.body.scrollTop

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

window.addEventListener('scroll', onscroll)
