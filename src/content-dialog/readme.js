const dialogLink1 = document.getElementById('content-dialog-link-example-1')
const dialog1 = document.getElementById('content-dialog-example-1')
dialogLink1.addEventListener('click', e => dialog1.show())

const dialogLink2 = document.getElementById('content-dialog-link-example-2')
const dialog2 = document.getElementById('content-dialog-example-2')

let clickCount = 0
dialogLink2.addEventListener('click', e => {
  dialog2.show()
})

dialog2.addEventListener('click', e => {
  if (e.target.value === 'increment') {
    clickCount++
  } else if (e.target.value === 'decrement' && clickCount > 0) {
    clickCount--
  } else {
    return
  }

  dialog2.setProps(props => ({
    ...props,
    message: `Clicked ${clickCount} times.`
  }))
})

const dialogLink3 = document.getElementById('content-dialog-link-example-3')
const dialog3 = document.getElementById('content-dialog-example-3')
dialogLink3.addEventListener('click', e => dialog3.show())
