const button = document.getElementById('loading-button-example')
button.addEventListener('click', e => {
  setTimeout(() => {
    button.done()
  }, 3e3)
})
