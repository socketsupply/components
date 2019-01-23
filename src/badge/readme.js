const add = document.getElementById('add-notification')
const subtract = document.getElementById('subtract-notification')
const tonicBadge = document.querySelector('tonic-badge')

add.addEventListener('click', (e) => {
  tonicBadge.setState(state => ({
    ...state,
    count: ++state.count
  }))

  tonicBadge.reRender()
})

subtract.addEventListener('click', e => {
  tonicBadge.setState(state => {
    let count = state.count

    return {
      ...state,
      count: count > 0 ? --count : count
    }
  })

  tonicBadge.reRender()
})
