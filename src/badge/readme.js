const add = document.getElementById('add-notification')
const subtract = document.getElementById('subtract-notification')
const tonicBadge = document.querySelector('tonic-badge')

let count = 0

add.addEventListener('click', (e) => {
  tonicBadge.reRender(props => ({
    ...props,
    count: ++count
  }))
})

subtract.addEventListener('click', e => {
  tonicBadge.reRender(props => ({
    ...props,
    count: count > 0 ? --count : count
  }))
})
