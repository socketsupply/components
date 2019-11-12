const tape = require('tape')
const { qs } = require('qs')

tape('{{toggle-1}} default state renders properly', t => {
  const container = qs('#toggle-1')
  const component = qs('tonic-toggle', container)
  const toggleWrapper = qs('.tonic--switch', component)
  const input = qs('input', toggleWrapper)
  const label = qs('label', toggleWrapper)

  t.plan(4)

  t.ok(input, 'the component was constructed with an input')
  t.ok(toggleWrapper, 'the component was constructed with a toggle wrapper')
  t.ok(component.hasAttribute('id'), 'the component has an id')
  t.equal(input.getAttribute('id'), label.getAttribute('for'), 'the input id matches the label')

  t.end()
})

tape('{{toggle-2}} has tabindex attribute', t => {
  const container = qs('#toggle-2')
  const component = qs('tonic-toggle', container)
  const toggleWrapper = qs('.tonic--switch', component)
  const input = qs('input', toggleWrapper)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.equal(component.hasAttribute('tabindex'), false, 'component does not have a tabindex')
  t.equal(input.hasAttribute('tabindex'), true, 'input has a tabindex')

  t.end()
})
