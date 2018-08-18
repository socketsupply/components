const select = document.getElementById('content-route-select')
const page2 = document.getElementById('page2')

select.addEventListener('change', e => {
  window.history.pushState({}, '', select.value)
})

page2.addEventListener('show', e => {
  const { number } = e.target.getProps()

  document.getElementById('page2-number').textContent = number
})
