const notificationCounter = document.querySelector('.notification-counter')
const notificationBadge = document.querySelector('notification-badge')

let count = 0

notificationCounter.addEventListener('click', (e) => {
  if (!e.target) return

  if (e.target.classList.contains('add-notification')) {
    count++
  } else if (e.target.classList.contains('subtract-notification')) {
    (count > 0) && count--
  }

  notificationBadge.reRender(props => ({
    ...props,
    count: `${count}`
  }))
})
