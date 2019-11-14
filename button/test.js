const tape = require('tape')
const { qs } = require('qs')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

const sleep = n => new Promise(resolve => setTimeout(resolve, n))

document.body.appendChild(html`
<section id="button">
  <h2>Button</h2>

  <div id="button-1" class="test-container">
    <span>Default Button</span>
    <tonic-button></tonic-button>
  </div>

  <div id="button-2" class="test-container">
    <span>Button has text content</span>
    <tonic-button>Text Content</tonic-button>
  </div>

  <div id="button-3" class="test-container">
    <span>disabled="true"</span>
    <tonic-button disabled="true">Button</tonic-button>
  </div>

  <div id="button-4" class="test-container">
    <span>disabled="false"</span>
    <tonic-button disabled="false">Button</tonic-button>
  </div>

  <div id="button-5" class="test-container">
    <span>Has all attributes</span>
    <tonic-button
      margin="10px"
      type="reset"
      autofocus="true"
      width="200px"
      height="50px"
      tabindex="1"
      radius="5px"></tonic-button>
  </div>

  <div id="button-6" class="test-container">
    <span>fill="rgb(240, 102, 83)"</span>
    <tonic-button
      fill="rgb(240, 102, 83)"
      text-color="white">Button</tonic-button>
  </div>

  <div id="button-7" class="test-container">
    <span>border-color, border-width, text-color</span>
    <tonic-button
      border-color="rgb(240, 102, 83)"
      border-width="3px"
      text-color="rgb(240, 102, 83)">Button</tonic-button>
  </div>

  <div id="button-8" class="test-container">
    <span>async="true"</span>
    <tonic-button async="true">Button</tonic-button>
  </div>

  <div id="button-9" class="test-container">
    <span>async="false"</span>
    <tonic-button async="false">Button</tonic-button>
  </div>

  <div id="button-10" class="test-container">
    <span>tabindex="0"</span>
    <tonic-button tabindex="0">Button</tonic-button>
  </div>

  <div id="button-11" class="test-container">
    <span>href and target</span>
    <tonic-button target="_blank" href="https://google.com">target="_blank"</tonic-button>
    <tonic-button target="_self" href="https://google.com">target="_self"</tonic-button>
    <tonic-button href="https://google.com">No target</tonic-button>
  </div>

</section>
`)

tape('{{button-1}} has correct default state', t => {
  const container = qs('#button-1')
  const component = qs('tonic-button', container)
  const wrapper = qs('.tonic--button--wrapper', component)
  const button = qs('button', component)
  const isLoading = button.classList.contains('tonic--loading')

  t.plan(6)

  t.ok(wrapper, 'component was constructed with a wrapper')
  t.ok(button, 'component was constructed with a button element')
  t.ok(!button.hasAttribute('disabled'), 'does not have disabled attribute')
  t.equal(button.getAttribute('autofocus'), 'false', 'autofocus is false')
  t.equal(button.getAttribute('async'), 'false', 'async attribute is false')
  t.equal(isLoading, false, 'loading class is not applied')

  t.end()
})

tape('{{button-2}} has value', t => {
  const container = qs('#button-2')
  const component = qs('tonic-button', container)
  const button = qs('button', component)

  t.plan(4)

  t.ok(button, 'the component was constructed with a button')
  t.ok(!component.hasAttribute('value'), 'the component does not have a value attribute')
  t.ok(button.textContent, 'the button has text content')
  t.equal(button.textContent, button.getAttribute('alt'), 'button has alt attribute that matches value')

  t.end()
})

tape('{{button-3}} is disabled', t => {
  const container = qs('#button-3')
  const component = qs('tonic-button', container)
  const button = qs('button', component)

  t.plan(2)

  t.ok(button, 'the component was constructed with a button')
  t.ok(button.hasAttribute('disabled'), 'the button has the disabled attribute')

  t.end()
})

tape('{{button-4}} is not disabled when disabled="false"', t => {
  const container = qs('#button-4')
  const component = qs('tonic-button', container)
  const button = qs('button', component)

  t.plan(3)

  t.ok(button, 'the component was constructed with a button')
  t.equal(component.getAttribute('disabled'), 'false', 'component has the disabled="false" attribute')
  t.ok(!button.hasAttribute('disabled'), 'button does not have disabled class')

  t.end()
})

tape('{{button-5}} has correct attributes', t => {
  const container = qs('#button-5')
  const component = qs('tonic-button', container)
  const buttonWrapper = qs('.tonic--button--wrapper', component)
  const button = qs('button', component)

  t.plan(9)

  t.ok(button, 'the component was constructed with a button')
  t.equal(button.getAttribute('autofocus'), 'true', 'button has autofocus="true" attribute')
  t.equal(button.getAttribute('type'), 'reset', 'button has type="reset" attribute')
  t.ok(buttonWrapper.style.margin === '10px', 'button wrapper has margin="10px"')
  t.ok(button.style.width === '200px', 'button has width of 200px')
  t.ok(button.style.height === '50px', 'button has height of 50px')
  t.ok(button.style.borderRadius === '5px', 'button has border radius of 5px')
  t.equal(button.getAttribute('tabindex'), '1', 'tabindex is 1')
  t.equal(button.getAttribute('type'), button.textContent, 'button has text content equal to type')

  t.end()
})

tape('{{button-6}} gets style derived from component "fill" attribute', t => {
  const container = qs('#button-6')
  const component = qs('tonic-button', container)
  const button = qs('button', component)

  t.ok(button, 'the component was constructed with a button')
  t.ok(component.hasAttribute('fill'), 'the component has fill attribute')
  t.equal(component.getAttribute('fill'), button.style.backgroundColor, 'the fill attribute matches button background color')
  // Testing borderColor doesn't work in Safari, specific borderColor property isn't created
  // t.equal(component.getAttribute('fill'), button.style.borderColor, 'the fill attribute matches button border color')
  t.equal(window.getComputedStyle(button).borderColor, 'rgb(240, 102, 83)', 'the color was added')

  t.end()
})

tape('{{button-7}} gets border style derived from component attributes', t => {
  const container = qs('#button-7')
  const component = qs('tonic-button', container)
  const button = qs('button', component)

  t.ok(button, 'the component was constructed with a button')
  t.equal(component.getAttribute('border-width'), button.style.borderWidth, 'button contains style "border-width" matching component attribute "border-width"')
  t.equal(component.getAttribute('text-color'), button.style.color, 'button contains style "color" matching component attribute "text-color"')

  t.end()
})

tape('{{button-8}} is async, shows loading state when clicked', async t => {
  const container = qs('#button-8')
  const component = qs('tonic-button', container)

  t.plan(3)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(component.getAttribute('async'), 'true', 'the button async attribute is true')

  component.addEventListener('click', async e => {
    const button = component.querySelector('button')

    await sleep(128)
    const isLoading = button.classList.contains('tonic--loading')
    t.ok(isLoading, 'loading class was applied')
    t.end()
  })

  component.dispatchEvent(new window.Event('click'))
})

tape('{{button-9}} is not async, does not show loading when clicked', async t => {
  const container = qs('#button-9')
  const component = qs('tonic-button', container)

  t.plan(3)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(component.getAttribute('async'), 'false', 'the button async attribute is false')

  component.addEventListener('click', async e => {
    const button = component.querySelector('button')

    await sleep(128)
    const isLoading = button.classList.contains('tonic--loading')
    t.ok(!isLoading, 'loading class was not applied')

    t.end()
  })

  component.dispatchEvent(new window.Event('click'))
})

tape('{{button-10}} has tabindex attribute', t => {
  const container = qs('#button-10')
  const component = qs('tonic-button', container)
  const button = qs('button', component)

  t.plan(3)

  t.ok(button, 'the component was constructed with a button')
  t.equal(component.hasAttribute('tabindex'), false, 'component does not have a tabindex')
  t.equal(button.hasAttribute('tabindex'), true, 'button has a tabindex')

  t.end()
})
