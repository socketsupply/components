const tape = require('../../test/tape')

const test = tape('badge')

test('default state', t => {
  const container = document.getElementById('badge-1')
  const component = container.querySelector('tonic-badge')

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(component.value, 0, 'the default value is zero')

  t.end()
})
