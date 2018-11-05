const toaster1 = document.getElementById('toaster-1')
const toasterLink1 = document.getElementById('toaster-link-1')

toasterLink1.addEventListener('click', e => {
  toaster1.create({
    type: 'warning',
    title: 'Warning',
    message: 'This is a warning, please be careful.'
  })
})
