document.addEventListener('DOMContentLoaded', e => {
  const notification = document.getElementsByTagName('notification-center')[0]
  const select = document.getElementById('options-example-1')

  select.addEventListener('change', ({ target }) => {
    const { value } = target.options[target.selectedIndex]
    notification.create({
      type: 'success',
      message: `The value of the selected option was "${value}".`,
      title: 'Selection',
      duration: 2000
    })
  })
})
