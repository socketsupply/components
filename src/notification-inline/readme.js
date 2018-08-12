const notificationInline1 = document.getElementById('notification-inline-example-1')
const notificationInlineLink1 = document.getElementById('notification-inline-button-1')

notificationInlineLink1.addEventListener('click', e => {
  notificationInline1.create({
    message: 'This is an alert'
  })
})

const notificationInline2 = document.getElementById('notification-inline-example-2')
const notificationInlineLink2 = document.getElementById('notification-inline-button-2')

notificationInlineLink2.addEventListener('click', e => {
  notificationInline2.create({
    type: 'success'
  })
})

const notificationInline3 = document.getElementById('notification-inline-example-3')
const notificationInlineLink3 = document.getElementById('notification-inline-button-3')

notificationInlineLink3.addEventListener('click', e => {
  notificationInline3.create({
    type: 'warning'
  })
})

const notificationInline4 = document.getElementById('notification-inline-example-4')
const notificationInlineLink4 = document.getElementById('notification-inline-button-4')

notificationInlineLink4.addEventListener('click', e => {
  notificationInline4.create({
    type: 'danger',
    title: 'Danger zone!'
  })
})

const notificationInline5 = document.getElementById('notification-inline-example-5')
const notificationInlineLink5 = document.getElementById('notification-inline-button-5')

notificationInlineLink5.addEventListener('click', e => {
  notificationInline5.create({
    type: 'info',
    message: 'This is an information alert'
  })
})

const notificationInline6 = document.getElementById('notification-inline-example-6')
const notificationInlineLink6 = document.getElementById('notification-inline-button-6')

notificationInlineLink6.addEventListener('click', e => {
  notificationInline6.create({
    title: 'Note',
    message: 'This is an alert containing both a title and a message.'
  })
})

const notificationInline7 = document.getElementById('notification-inline-example-7')
const notificationInlineLink7 = document.getElementById('notification-inline-button-7')

notificationInlineLink7.addEventListener('click', e => {
  notificationInline7.create({
    title: 'This alert will self destruct in 3 seconds.',
    duration: 3e3
  })
})
