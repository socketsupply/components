const button = document.getElementById('tonic-button-example')
let timeout = null
button.addEventListener('click', e => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    button.loading(false)
  }, 3e3)
})
