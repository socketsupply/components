const tape = require('../../test/tape')

tape('default state for button-1', t => {
  const container = document.getElementById('button-1')
  const component = container.querySelector('tonic-button')

  t.ok(component.firstElementChild, 'the component was constructed')

  t.end()
})

tape('button-2 has value as attribute', t => {
  const container = document.getElementById('button-2')
  const component = container.querySelector('tonic-button')
  const buttonElement = component.querySelector('button')

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(component.hasAttribute('value'), 'the component has value attribute')
  t.equal(component.value, buttonElement.textContent, 'value attribute matches text of button')
  t.equal(component.value, buttonElement.getAttribute('alt'), 'button has alt attribute that matches value')

  t.end()
})

tape('button-3 has value as children', t => {
  const container = document.getElementById('button-3')
  const component = container.querySelector('tonic-button')
  const buttonElement = component.querySelector('button')

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(!component.hasAttribute('value'), 'the component does not have a value attribute')
  t.ok(buttonElement.textContent, 'the button does have text content')

  t.end()
})
