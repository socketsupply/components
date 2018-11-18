const range = document.getElementById('tonic-range-example')
const state = document.getElementById('tonic-range-state')

state.textContent = range.value

range.addEventListener('change', e => {
  state.textContent = range.value
})
