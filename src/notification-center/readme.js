const notification = document.querySelector('notification-center')

const onClick = (id, fn) => document
  .getElementById(id)
  .addEventListener('click', fn)

onClick('notification-button-1', e => notification.create({
  message: 'Hello, World', title: 'Greetings'
}))

onClick('notification-button-2', e => notification.create({
  type: 'success'
}))

onClick('notification-button-3', e => notification.create({
  type: 'warning'
}))

onClick('notification-button-4', e => notification.create({
  type: 'danger'
}))

onClick('notification-button-5', e => notification.create({
  type: 'info'
}))

onClick('notification-button-6', e => notification.create({
  message: 'Will self destruct in 3 seconds',
  title: 'Howdy',
  duration: 3e3
}))
