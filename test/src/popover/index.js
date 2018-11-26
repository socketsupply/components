//
// Panel Default
//
const popover = document.getElementById('tonic-popover-default')
popover.addEventListener('show', event => {
  document.body.addEventListener('click', e => {
    popover.hide()
  }, { once: true })
})
