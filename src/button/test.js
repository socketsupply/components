const tape = require('../../test/tape')
const { qs } = require('qs')

const sleep = n => new Promise(resolve => setTimeout(resolve, n))

tape('{{button-1}} has correct default state', t => {
  const container = qs('#button-1')
  const component = qs('tonic-button', container)
  const buttonElement = qs('button', component)
  const isLoading = buttonElement.classList.contains('tonic--loading')
  const attrAsyncIsFalse = buttonElement.getAttribute('async') === 'false'

  t.plan(4)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(buttonElement.getAttribute('disabled'), 'false', 'disabled is false')
  t.equal(buttonElement.getAttribute('autofocus'), 'false', 'autofocus is false')
  t.equal(attrAsyncIsFalse, !isLoading, 'async is false, loading class is not applied')

  t.end()
})

tape('{{button-2}} has value', t => {
  const container = qs('#button-2')
  const component = qs('tonic-button', container)
  const buttonElement = qs('button', component)

  t.plan(4)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(!component.hasAttribute('value'), 'the component does not have a value attribute')
  t.ok(buttonElement.textContent, 'the button has text content')
  t.equal(buttonElement.textContent, buttonElement.getAttribute('alt'), 'button has alt attribute that matches value')

  t.end()
})

tape('{{button-3}} is disabled', t => {
  const container = qs('#button-3')
  const component = qs('tonic-button', container)
  const buttonElement = qs('button', component)

  t.plan(3)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(buttonElement.hasAttribute('disabled'), 'the button has the disabled attribute')
  t.equal(buttonElement.getAttribute('disabled'), 'true', 'disabled is true')

  t.end()
})

tape('{{button-4}} is not disabled when disabled="false"', t => {
  const container = qs('#button-4')
  const component = qs('tonic-button', container)
  const buttonElement = qs('button', component)

  t.plan(3)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(buttonElement.hasAttribute('disabled'), 'the button has the disabled attribute')
  t.equal(buttonElement.getAttribute('disabled'), 'false', 'disabled is false')

  t.end()
})

tape('{{button-5}} has correct attributes', t => {
  const container = qs('#button-5')
  const component = qs('tonic-button', container)
  const buttonWrapper = qs('.tonic--button--wrapper', component)
  const buttonElement = qs('button', component)

  t.plan(9)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(buttonElement.getAttribute('autofocus'), 'true', 'button has autofocus="true" attribute')
  t.equal(buttonElement.getAttribute('type'), 'reset', 'button has type="reset" attribute')
  t.ok(buttonWrapper.style.margin === '10px', 'button wrapper has margin="10px"')
  t.ok(buttonElement.style.width === '200px', 'button has width of 200px')
  t.ok(buttonElement.style.height === '50px', 'button has height of 50px')
  t.ok(buttonElement.style.borderRadius === '5px', 'button has border radius of 5px')
  t.equal(buttonElement.getAttribute('tabindex'), '1', 'tabindex is 1')
  t.equal(buttonElement.getAttribute('type'), buttonElement.textContent, 'button has text content equal to type')

  t.end()
})

tape('{{button-6}} gets style derived from component "fill" attribute', t => {
  const container = qs('#button-6')
  const component = qs('tonic-button', container)
  const buttonElement = qs('button', component)

  t.plan(4)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(component.hasAttribute('fill'), 'the component has fill attribute')
  t.equal(component.getAttribute('fill'), buttonElement.style.backgroundColor, 'the fill attribute matches button background color')
  t.equal(component.getAttribute('fill'), buttonElement.style.borderColor, 'the fill attribute matches button border color')

  t.end()
})

tape('{{button-7}} gets border style derived from component attributes', t => {
  const container = qs('#button-7')
  const component = qs('tonic-button', container)
  const buttonElement = qs('button', component)

  t.plan(4)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(component.getAttribute('border-color'), buttonElement.style.borderColor, 'button contains style "border-color" matching component attribute "border-color"')
  t.equal(component.getAttribute('border-width'), buttonElement.style.borderWidth, 'button contains style "border-width" matching component attribute "border-width"')
  t.equal(component.getAttribute('text-color'), buttonElement.style.color, 'button contains style "color" matching component attribute "text-color"')

  t.end()
})

tape('{{button-8}} shows loading when clicked', async t => {
  const container = qs('#button-8')
  const component = qs('tonic-button', container)

  t.plan(1)

  component.addEventListener('click', async e => {
    const button = component.querySelector('button')

    await sleep(128)
    const isLoading = button.classList.contains('tonic--loading')
    t.ok(isLoading, 'loading class was applied')
    t.end()
  })

  component.dispatchEvent(new window.Event('click'))
})
