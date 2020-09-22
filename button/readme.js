const buttons = [...document.querySelectorAll('.tonic-button-example')]

for (const button of buttons) {
  button.addEventListener('click', e => {
    clearTimeout(button.timeout)
    button.timeout = setTimeout(() => {
      button.loading(false)
    }, 3e3)
  })
}
