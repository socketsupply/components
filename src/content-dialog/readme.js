const dialogLink1 = document.getElementById('content-dialog-link-example-1')
const dialog1 = document.getElementById('content-dialog-example-1')
dialogLink1.addEventListener('click', e => dialog1.show())

const dialogLink2 = document.getElementById('content-dialog-link-example-2')
const dialog2 = document.getElementById('content-dialog-example-2')

let count = 0
dialogLink2.addEventListener('click', e => dialog2.show())

dialog2.addEventListener('click', (e) => {
  if (!e.target.value) return

  if (e.target.value === 'decrement') {
    (count > 0) && count--
  } else {
    count++
  }

  dialog2.setProps(props => ({
    ...props,
    message: `Clicked ${count} times.`
  }))
})

const dialogLink3 = document.getElementById('content-dialog-link-example-3')
const dialog3 = document.getElementById('content-dialog-example-3')
dialogLink3.addEventListener('click', e => dialog3.show())
