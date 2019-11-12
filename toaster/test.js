const tape = require('../test/tape')
const { qs } = require('qs')

const notification = qs('tonic-toaster[position="center"]')
const sleep = n => new Promise(resolve => setTimeout(resolve, n))

tape('{{toaster}} is created and destroyed', async t => {
  notification.create({
    message: 'You have been notified.'
  })

  await sleep(512)

  const toaster = qs('.tonic--notification', notification)
  const toasterMain = qs('.tonic--main', toaster)
  const toasterMessage = qs('.tonic--message', toasterMain)
  const toasterTitle = qs('.tonic--title', toasterMain)
  const dismiss = toaster.classList.contains('tonic--close')
  const closeIcon = qs('.tonic--close', toaster)

  t.plan(6)

  t.ok(toaster, 'Toaster was created')
  t.ok(toasterMain, 'Toaster main div was created')
  t.ok(toasterMessage, 'Toaster message div was created')
  t.ok(toasterTitle, 'Toaster title div was created')

  t.equal(!dismiss, !closeIcon, 'Only if toaster has dismiss class, is close icon also created')

  notification.destroy(toaster)

  await sleep(512)

  const toasterB = qs('.tonic--notification', notification)
  t.ok(!toasterB, 'Toaster was destroyed')

  t.end()
})

tape('{{toaster}} with dismiss false is created without close icon', async t => {
  notification.create({
    message: 'I will stay open',
    dismiss: 'false'
  })

  await sleep(512)

  const toaster = qs('.tonic--notification', notification)
  const dismiss = toaster.classList.contains('tonic--close')
  const closeIcon = qs('.tonic--close', toaster)

  t.equal(!dismiss, !closeIcon, 'Only if toaster has dismiss class, is close icon also created')

  notification.destroy(toaster)
  t.end()
})

tape('{{toaster}} with type success is created', async t => {
  notification.create({
    type: 'success',
    message: 'Success!'
  })

  await sleep(512)

  const toaster = qs('.tonic--notification', notification)
  const toasterMessage = qs('.tonic--message', toaster)

  const alert = toaster.classList.contains('tonic--alert')
  const alertIcon = qs('.tonic--icon', toaster)

  t.ok(toaster, 'Toaster was created')
  t.equal(toasterMessage.textContent, 'Success!', 'Toaster textContent matches message')
  t.equal(!alert, !alertIcon, 'If toaster does not have alert class, alert icon is not created')

  notification.destroy(toaster)
  t.end()
})

tape('{{toaster}} is created and destroyed after duration', async t => {
  notification.create({
    message: 'Short and sweet',
    duration: 512
  })

  await sleep(128)

  const toaster = qs('.tonic--notification', notification)
  t.ok(toaster, 'Toaster was created')

  await sleep(1024)

  const toasterB = qs('.tonic--notification', notification)
  t.ok(!toasterB, 'Toaster was destroyed')

  t.end()
})

tape('{{toaster}} is created on the left', async t => {
  const notificationLeft = qs('tonic-toaster[position="left"]')
  const wrapper = qs('.tonic--left', notificationLeft)

  notificationLeft.create({
    message: 'Left toaster',
    duration: 3e3
  })

  await sleep(128)

  const toaster = qs('.tonic--notification', wrapper)

  t.ok(wrapper, 'Wrapper was created with the tonic--left class')
  t.ok(toaster, 'Toaster was created')

  t.end()
})

tape('{{toaster}} is created on the right', async t => {
  const notificationRight = qs('tonic-toaster[position="right"]')
  const wrapper = qs('.tonic--right', notificationRight)

  notificationRight.create({
    message: 'Right toaster',
    duration: 3e3
  })

  await sleep(128)

  const toaster = qs('.tonic--notification', wrapper)

  t.ok(wrapper, 'Wrapper was created with the tonic--right class')
  t.ok(toaster, 'Toaster was created')

  t.end()
})
