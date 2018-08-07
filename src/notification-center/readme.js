const notification = document.getElementsByTagName('notification-center')[0]

const notificationLink1 = document.getElementById('notification-link-1')
notificationLink1.addEventListener('click', e => {
  notification.create({
    message: 'Hello, World', title: 'Greetings'
  })
})

const notificationLink2 = document.getElementById('notification-link-2')
notificationLink2.addEventListener('click', e => {
  notification.create({
    type: 'success'
  })
})

const notificationLink3 = document.getElementById('notification-link-3')
notificationLink3.addEventListener('click', e => {
  notification.create({
    type: 'warning'
  })
})

const notificationLink4 = document.getElementById('notification-link-4')
notificationLink4.addEventListener('click', e => {
  notification.create({
    type: 'danger'
  })
})

const notificationLink5 = document.getElementById('notification-link-5')
notificationLink5.addEventListener('click', e => {
  notification.create({
    type: 'info'
  })
})

const notificationLink6 = document.getElementById('notification-link-6')
notificationLink6.addEventListener('click', e => {
  notification.create({
    message: 'Will self destruct in 3 seconds',
    title: 'Howdy',
    duration: 3e3
  })
})
