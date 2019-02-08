const tape = require('../../test/tape')

tape('default state for badge-1', t => {
  const container = document.getElementById('badge-1')
  const component = container.querySelector('tonic-badge')

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(component.value, 0, 'the default value is zero')

  t.end()
})

tape('badge-2 shows a count', t => {
  const container = document.getElementById('badge-2')
  const component = container.querySelector('tonic-badge')
  const span = component.querySelector('span')
  const notification = component.querySelector('.tonic--new')

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(component.hasAttribute('count'), 'the component has a count attribute')
  t.equal(component.value, span.textContent, 'the badge shows the correct value')
  t.ok(notification, 'badge shows new notifications')

  t.end()
})
