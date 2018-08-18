{
  const button = document.getElementById('content-route-button')
  const select = document.getElementById('content-route-select')

  button.addEventListener('click', e => {
    e.preventDefault()
    window.history.pushState({}, '', select.value)
  })
}
