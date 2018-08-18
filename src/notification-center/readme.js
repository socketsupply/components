const notification = document.querySelector('notification-center')

const onClick = (id, fn) => document
  .getElementById(id)
  .addEventListener('click', fn)

onClick('notification-center-example', e => notification.create({
  type: 'success',
  title: 'Greetings',
  message: 'Hello, World',
  duration: 3e3
}))
