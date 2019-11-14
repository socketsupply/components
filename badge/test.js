const tape = require('tape')
const { qs } = require('qs')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="badge">
  <h2>Badge</h2>

  <div id="badge-1" class="test-container">
    <span>Default</span>
    <tonic-badge></tonic-badge>
  </div>

  <div id="badge-2" class="test-container">
    <span>count="6"</span>
    <tonic-badge count="6"></tonic-badge>
  </div>

  <div id="badge-3" class="test-container">
    <span>theme="light"</span>
    <tonic-badge count="1" theme="light"></tonic-badge>
  </div>

  <div id="badge-4" class="dark test-container">
    <span>theme="dark"</span>
    <tonic-badge count="1" theme="dark"></tonic-badge>
  </div>

</section>
`)

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
