const link1 = document.getElementById('content-route-link-1')
const link2 = document.getElementById('content-route-link-2')

link1.addEventListener('click', e => {
  e.preventDefault()
  window.history.pushState({}, 'Foo 100', '/foo/100')
})

link2.addEventListener('click', e => {
  e.preventDefault()
  window.history.back()
})
