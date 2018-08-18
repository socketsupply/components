const add = document.getElementById('add-notification')
const subtract = document.getElementById('subtract-notification')
const notificationBadge = document.querySelector('notification-badge')

let count = 0

add.addEventListener('click', (e) => {
  notificationBadge.reRender(props => ({
    ...props,
    count: ++count
  }))
})

subtract.addEventListener('click', e => {
  notificationBadge.reRender(props => ({
    ...props,
    count: count > 0 ? count-- : count
  }))
})
