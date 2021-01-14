const form = document.getElementById('form-example')
const button = document.getElementById('form-submit')

form.addEventListener('input', e => {
  button.disabled = !form.validate()
})

form.addEventListener('change', e => {
  button.disabled = !form.validate()
})
