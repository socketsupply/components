const select = document.getElementById('options-example-1')
const notification = document.getElementsByTagName('tonic-toaster')[0]

select.addEventListener('change', ({ target }) => {
  if (select.value === 'c') {
    select.setInvalid('Bad choice')
  } else {
    select.setValid()
  }

  notification.create({
    type: 'success',
    message: `Selected option was "${select.value}".`,
    title: 'Selection',
    duration: 2000
  })
})
