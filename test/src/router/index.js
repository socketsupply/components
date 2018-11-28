const select = document.getElementById('tonic-router-select')
const page2 = document.getElementById('page2')

select.addEventListener('change', e => {
  window.history.pushState({}, '', select.value)
})

page2.addEventListener('match', () => {
  const { number } = page2.getProps()
  const el = document.getElementById('page2-number')
  el.textContent = number
})
