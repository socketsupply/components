const tape = require('../test/tape')
const { qs } = require('qs')

tape('{{badge-1}} has correct default state', t => {
  const container = qs('#badge-1')
  const component = qs('tonic-badge', container)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(component.value, 0, 'the default value is zero')

  t.end()
})

tape('{{badge-2}} shows a count', t => {
  const container = qs('#badge-2')
  const component = qs('tonic-badge', container)
  const span = qs('span', component)
  const notification = qs('.tonic--new', component)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(component.hasAttribute('count'), 'the component has a count attribute')
  t.equal(component.value, span.textContent, 'the badge shows the correct value')
  t.ok(notification, 'badge shows new notifications')

  t.end()
})
