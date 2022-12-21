import { test } from 'tapzero'
import { qs } from 'qsa-min'

import { html } from '../_test/util'
import { Tonic } from '@socketsupply/tonic'
import { Components } from '..'

Components(Tonic)

document.body.appendChild(html`
<section id="badge">
  <h2>Badge</h2>

  <div id="badge-1" class="test-container">
    <span>Default</span>
    <tonic-badge id="tonic-badge-1"></tonic-badge>
  </div>

  <div id="badge-2" class="test-container">
    <span>count="6"</span>
    <tonic-badge id="tonic-badge-2" count="6"></tonic-badge>
  </div>

  <div id="badge-3" class="test-container">
    <span>theme="light"</span>
    <tonic-badge id="tonic-badge-3" count="1" theme="light"></tonic-badge>
  </div>

  <div id="badge-4" class="dark test-container">
    <span>theme="dark"</span>
    <tonic-badge id="tonic-badge-4" count="1" theme="dark"></tonic-badge>
  </div>

</section>
`)

test('{{badge-1}} has correct default state', t => {
  const container = qs('#badge-1')
  const component = qs('tonic-badge', container)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(component.value, 0, 'the default value is zero')
})

test('{{badge-2}} shows a count', t => {
  const container = qs('#badge-2')
  const component = qs('tonic-badge', container)
  const span = qs('span', component)
  const notification = qs('.tonic--new', component)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(component.hasAttribute('count'), 'the component has a count attribute')
  t.equal(component.value, span.textContent, 'the badge shows the correct value')
  t.ok(notification, 'badge shows new notifications')
})

test('badge shows tonic--new style', t => {
  const span1 = qs('#badge-1 tonic-badge span')
  const span2 = qs('#badge-2 tonic-badge span')

  const styles1 = window.getComputedStyle(span1, ':after')
  const styles2 = window.getComputedStyle(span2, ':after')

  t.equal(styles1.display, 'none')
  t.equal(styles2.display, 'block')
})
