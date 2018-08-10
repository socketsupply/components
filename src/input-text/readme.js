const setInvalid = document.querySelector('input-button[value="set-invalid"]')
const setValid = document.querySelector('input-button[value="set-valid"]')
const input = document.querySelector('#input-invalidation-example-1')

setInvalid.addEventListener('click', (e) => {
  input.setInvalid('There was a problem')
})

setValid.addEventListener('click', (e) => {
  input.setValid()
})
