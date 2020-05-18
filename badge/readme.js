const add = document.getElementById('add-notification')
const subtract = document.getElementById('subtract-notification')
const tonicBadge = document.querySelector('tonic-badge')

add.addEventListener('click', (e) => {
  ++tonicBadge.state.count

  tonicBadge.reRender()
})

subtract.addEventListener('click', e => {
  let count = tonicBadge.state.count
  tonicBadge.state.count = count > 0 ? --count : count

  tonicBadge.reRender()
})
