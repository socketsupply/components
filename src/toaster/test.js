const notification = document.querySelector('tonic-toaster[position="center"]')

// Toaster Default
const toasterDefault = document.getElementById('tonic-toaster-default')
toasterDefault.addEventListener('click', e => {
  notification.create({
    message: 'You have been notified.'
  })
})

// Toaster Type Success
const toasterSuccess = document.getElementById('tonic-toaster-type-success')
toasterSuccess.addEventListener('click', e => {
  notification.create({
    type: 'success',
    message: 'Success!'
  })
})

// Toaster Type Warning
const toasterWarning = document.getElementById('tonic-toaster-type-warning')
toasterWarning.addEventListener('click', e => {
  notification.create({
    type: 'warning',
    message: 'This is a warning!'
  })
})

// Toaster Type Danger
const toasterDanger = document.getElementById('tonic-toaster-type-danger')
toasterDanger.addEventListener('click', e => {
  notification.create({
    type: 'danger',
    message: 'Danger zone!'
  })
})

// Toaster Type Info
const toasterInfo = document.getElementById('tonic-toaster-type-info')
toasterInfo.addEventListener('click', e => {
  notification.create({
    type: 'info',
    message: 'For Your Information...'
  })
})

// Toaster w/ Title
const toasterTitle = document.getElementById('tonic-toaster-title')
toasterTitle.addEventListener('click', e => {
  notification.create({
    title: 'Hello!'
  })
})

// Toaster w/ Message
const toasterMessage = document.getElementById('tonic-toaster-message')
toasterMessage.addEventListener('click', e => {
  notification.create({
    message: 'Hello World'
  })
})

// Toaster w/ Title & Message
const toasterTitleMessage = document.getElementById('tonic-toaster-title-message')
toasterTitleMessage.addEventListener('click', e => {
  notification.create({
    title: 'Hello',
    message: 'How are you doing today?'
  })
})

// Toaster w/ Type, Title & Message
const toasterTypeTitleMessage = document.getElementById('tonic-toaster-type-title-message')
toasterTypeTitleMessage.addEventListener('click', e => {
  notification.create({
    title: 'Hello',
    message: 'How are you doing today?'
  })
})

// Toaster w/ Dismiss
const toasterDismiss = document.getElementById('tonic-toaster-dismiss')
toasterDismiss.addEventListener('click', e => {
  notification.create({
    title: 'Hello',
    message: 'How are you doing today?',
    dismiss: true
  })
})

// Toaster w/out Dismiss
const toasterDismissFalse = document.getElementById('tonic-toaster-dismiss-false')
toasterDismissFalse.addEventListener('click', e => {
  notification.create({
    title: 'Hello',
    message: 'How are you doing today?',
    dismiss: false
  })
})

// Toaster w/ Dismiss w/ duration
const toasterDismissDuration = document.getElementById('tonic-toaster-dismiss-duration')
toasterDismissDuration.addEventListener('click', e => {
  notification.create({
    title: 'Hello',
    message: 'How are you doing today?',
    dismiss: true,
    duration: 3e3
  })
})

// Toaster w/out Dismiss w/ duration
const toasterDismissFalseDuration = document.getElementById('tonic-toaster-dismiss-false-duration')
toasterDismissFalseDuration.addEventListener('click', e => {
  notification.create({
    title: 'Hello',
    message: 'How are you doing today?',
    dismiss: false,
    duration: 3e3
  })
})

const notificationLeft = document.querySelector('tonic-toaster[position="left"]')
const notificationRight = document.querySelector('tonic-toaster[position="right"]')

// Toaster w/ Left Notification
const toasterPositionLeft = document.getElementById('tonic-toaster-position-left')
toasterPositionLeft.addEventListener('click', e => {
  notificationLeft.create({
    title: 'Toaster',
    message: 'Hi, I am on the left',
    duration: 3e3
  })
})

// Toaster w/ Right Notification
const toasterPositionRight = document.getElementById('tonic-toaster-position-right')
toasterPositionRight.addEventListener('click', e => {
  notificationRight.create({
    title: 'Toaster',
    message: 'Hi, I am on the right',
    duration: 3e3
  })
})

const notificationLight = document.querySelector('tonic-toaster[theme="light"]')
const notificationDark = document.querySelector('tonic-toaster[theme="dark"]')

// Toaster w/ theme light
const toasterThemeLight = document.getElementById('tonic-toaster-theme-light')
toasterThemeLight.addEventListener('click', e => {
  notificationLight.create({
    title: 'Light',
    message: 'Step lightly now'
  })
})

// Toaster w/ theme dark
const toasterThemeDark = document.getElementById('tonic-toaster-theme-dark')
toasterThemeDark.addEventListener('click', e => {
  notificationDark.create({
    title: 'Dark',
    message: 'These are dark times we live in'
  })
})
