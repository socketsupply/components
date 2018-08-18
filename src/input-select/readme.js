document.addEventListener('DOMContentLoaded', e => {
  const select = document.getElementById('options-example-1')
  const notification = document.getElementsByTagName('notification-center')[0]

  select.addEventListener('change', ({ target }) => {
    notification.create({
      type: 'success',
      message: `Selected option was "${select.value}".`,
      title: 'Selection',
      duration: 2000
    })
  })
})
