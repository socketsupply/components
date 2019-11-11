const tape = require('../../test/tape')
const { qs } = require('qs')

tape('{{input-1}} default state is constructed', t => {
  const component = qs('tonic-input#input-1')
  const wrapper = qs('.tonic--wrapper', component)
  const input = qs('input', wrapper)
  const invalid = qs('.tonic--invalid', wrapper)

  t.plan(4)

  t.ok(wrapper, 'the component was constructed, has a wrapper')
  t.ok(input, 'the component contains an input')
  t.ok(invalid, 'the component contains a tonic invalid div')
  t.ok(!input.hasAttribute('disabled'), 'the input is not disabled by default')

  t.end()
})

tape('{{input-2}} contains a default value', t => {
  const component = qs('tonic-input#input-2')
  const input = qs('input', component)
  const value = component.getAttribute('value')

  t.plan(2)

  t.equal(value, input.getAttribute('value'), 'component input value attributes match')
  t.equal(value, input.value, 'component value attribute matches input value')

  t.end()
})

tape('{{input-3}} contains a type', t => {
  const component = qs('tonic-input#input-3')
  const input = qs('input', component)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.ok(component.hasAttribute('type'), 'component input value attributes match')
  t.equal(component.getAttribute('type'), input.type, 'component type matches input type')

  t.end()
})

tape('{{input-4}} is required', t => {
  const component = qs('tonic-input#input-4')
  const input = qs('input', component)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.equal(component.getAttribute('required'), 'true', 'component contains required attribute')
  t.equal(input.required, true, 'input is required')

  t.end()
})

tape('{{input-5}} is disabled', t => {
  const component = qs('tonic-input#input-5')
  const input = qs('input', component)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.equal(component.getAttribute('disabled'), 'true', 'component contains disabled="true" attribute')
  t.ok(input.hasAttribute('disabled'), 'input has disabled attribute')

  t.end()
})

tape('{{input-6}} has spellcheck attribute', t => {
  const component = qs('tonic-input#input-6')
  const input = qs('input', component)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.ok(component.hasAttribute('spellcheck'), 'component contains spellcheck attribute')
  t.equal(component.getAttribute('spellcheck'), input.getAttribute('spellcheck'), 'component spellcheck attr matches input')

  t.end()
})

tape('{{input-7}} shows error message', t => {
  const component = qs('tonic-input#input-7')
  const input = qs('input', component)
  const error = qs('.tonic--invalid', component)
  const errorMessage = qs('span', error)

  t.plan(4)

  t.ok(input, 'the component was constructed with an input')
  t.ok(error, 'the component was constructed with an error')
  t.equal(component.getAttribute('error-message'), errorMessage.textContent, 'attribute matches error text')
  t.ok(qs('input:invalid', component), 'input is invalid, error is showing')

  t.end()
})

tape('{{input-8}} has placeholder', t => {
  const component = qs('tonic-input#input-8')
  const input = qs('input', component)

  t.plan(2)

  t.ok(input, 'the component was constructed with an input')
  t.equal(component.getAttribute('placeholder'), input.getAttribute('placeholder'), 'component and input placeholder attributes match')

  t.end()
})

tape('{{input-9}} has label', t => {
  const component = qs('tonic-input#input-9')
  const input = qs('input', component)
  const label = qs('label:not(.tonic--icon)', component)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.ok(label, 'the component was constructed with a label')
  t.equal(component.getAttribute('label'), label.textContent, 'component label attribute matches text of label')

  t.end()
})

tape('{{input-10}} has tabindex', t => {
  const component = qs('tonic-input#input-10')
  const input = qs('input', component)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.equal(component.hasAttribute('tabindex'), false, 'component does not have a tabindex')
  t.equal(input.hasAttribute('tabindex'), true, 'input has a tabindex')

  t.end()
})

tape('{{input-11}} has readonly attribute', t => {
  const component = qs('tonic-input#input-11')
  const input = qs('input', component)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.equal(component.hasAttribute('readonly'), true, 'component has a readonly="true" attribute')
  t.ok(input.hasAttribute('readonly'), 'input has a readonly attribute')

  t.end()
})
