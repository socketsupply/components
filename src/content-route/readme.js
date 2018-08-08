const link1 = document.getElementById('content-route-link-1')
const link2 = document.getElementById('content-route-link-2')

link1.addEventListener('click', e => {
  e.preventDefault()
  const r = Math.random().toString(16).slice(2, 4)
  window.history.pushState({}, 'Foo 100', '/foo/' + r)
})

link2.addEventListener('click', e => {
  e.preventDefault()
  window.history.back()
})
