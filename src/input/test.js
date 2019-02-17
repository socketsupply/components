const tape = require('../../test/tape')
const { qs } = require('qs')

tape('{{input-1}} default state is constructed', t => {
  const container = qs('#input-1')
  const component = qs('tonic-input', container)
  const wrapper = qs('.tonic--wrapper', component)
  const input = qs('input', wrapper)
  const invalid = qs('.tonic--invalid', wrapper)

  t.ok(wrapper, 'the component was constructed, has a wrapper')
  t.ok(input, 'the component contains an input')
  t.ok(invalid, 'the component contains a tonic invalid div')
  t.ok(!input.hasAttribute('disabled'), 'the input is not disabled by default')

  t.end()
})

tape('{{input-2}} contains a default value', t => {
  const container = qs('#input-2')
  const component = qs('tonic-input', container)
  const input = qs('input', component)
  const value = component.getAttribute('value')

  t.equal(value, input.getAttribute('value'), 'component input value attributes match')
  t.equal(value, input.value, 'component value attribute matches input value')

  t.end()
})
