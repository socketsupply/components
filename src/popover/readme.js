const popover = document.getElementById('popover-example')
popover.addEventListener('show', event => {
  document.body.addEventListener('click', e => {
    popover.hide()
  }, { once: true })
})
