const tape = require('../../test/tape')
const { qs } = require('qs')

tape('{{checkbox-1}} has correct default state', t => {
  const container = qs('#checkbox-1')
  const component = qs('tonic-checkbox', container)
  const wrapper = qs('.tonic--checkbox--wrapper', component)
  const input = qs('input[type="checkbox"]', component)
  const icon = qs('.tonic--icon', component)

  t.plan(5)

  t.ok(wrapper, 'component constructed with a wrapper')
  t.ok(input, 'component constructed with an input')
  t.ok(input.hasAttribute('id'), 'input was constructed with an id')
  t.ok(icon, 'component constructed with default icon')
  t.ok(input.checked === false, 'the default checkbox is not checked')

  t.end()
})

tape('{{checkbox-2}} has correct label', t => {
  const container = qs('#checkbox-2')
  const component = qs('tonic-checkbox', container)
  const input = qs('input[type="checkbox"]', component)
  const label = qs('label:not(.tonic--icon)', component)

  t.plan(3)

  t.ok(input.hasAttribute('id'), 'input was constructed with an id')
  t.ok(label, 'component was constructed with a label')
  t.equal(component.getAttribute('label'), label.textContent, 'the label attribute matches the label text')

  t.end()
})

tape('{{checkbox-3}} is checked', t => {
  const container = qs('#checkbox-3')
  const component = qs('tonic-checkbox', container)
  const input = qs('input[type="checkbox"]', component)

  t.plan(3)

  t.ok(input, 'component was constructed with an input')
  t.ok(input.hasAttribute('id'), 'input was constructed with an id')
  t.ok(input.checked, 'the input is checked')

  t.end()
})

tape('{{checkbox-4}} is disabled', t => {
  const container = qs('#checkbox-4')
  const component = qs('tonic-checkbox', container)
  const input = qs('input[type="checkbox"]', component)

  t.plan(3)

  t.ok(input, 'component was constructed with an input')
  t.ok(input.hasAttribute('id'), 'input was constructed with an id')
  t.ok(input.hasAttribute('disabled'), 'the input is disabled')

  t.end()
})

tape('{{checkbox-5}} has size attributes', t => {
  const container = qs('#checkbox-5')
  const component = qs('tonic-checkbox', container)
  const icon = qs('label.tonic--icon', component)
  const input = qs('input[type="checkbox"]', component)
  const size = component.getAttribute('size')

  t.plan(5)

  t.ok(input, 'component was constructed with an input')
  t.ok(input.hasAttribute('id'), 'input was constructed with an id')
  t.ok(component.hasAttribute('size'), 'the component has a size attribute')
  t.ok(icon.style.width === size, 'the width equals the size attribute')
  t.ok(icon.style.height === size, 'the height equals the size attribute')

  t.end()
})

tape('{{checkbox-6}} has size attributes', t => {
  const container = qs('#checkbox-6')
  const component = qs('tonic-checkbox', container)
  const input = qs('input[type="checkbox"]', component)

  t.plan(4)

  t.ok(input, 'component was constructed with an input')
  t.ok(input.hasAttribute('id'), 'input was constructed with an id')
  t.equal(component.hasAttribute('tabindex'), false, 'component does not have a tabindex')
  t.equal(input.hasAttribute('tabindex'), true, 'input has a tabindex')

  t.end()
})
