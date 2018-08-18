const notification = document.querySelector('notification-center')

document
  .getElementById('notification-center-example')
  .addEventListener('click', e => notification.create({
    type: 'success',
    title: 'Greetings',
    message: 'Hello, World',
    duration: 3e3
  }))
