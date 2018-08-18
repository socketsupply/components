const notification1 = document.getElementById('notification-1')
const notificationLink1 = document.getElementById('notification-link-1')

notificationLink1.addEventListener('click', e => {
  notification1.create({
    type: 'warning',
    title: 'Warning',
    message: 'This is a warning, please be careful.'
  })
})
