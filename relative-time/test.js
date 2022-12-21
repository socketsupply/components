import { test } from 'tapzero'
import { qs } from 'qsa-min'

import { html } from '../_test/util'
import { Components } from '..'
import { RelativeTime } from '.'
import { Tonic } from '@socketsupply/tonic'
Components(Tonic)

const NOW_MINUS_5 = new Date()
NOW_MINUS_5.setMinutes(NOW_MINUS_5.getMinutes() - 5)

document.body.appendChild(html`
  <section id="relative-time">
    <h2>Relative Time</h2>

    <div class="test-container">
      <tonic-relative-time
        id="relative-time-now"
        date="${new Date()}">
      </tonic-relative-time>
    </div>

    <div class="test-container">
      <tonic-relative-time
        id="relative-time-then"
        date="${NOW_MINUS_5}">
      </tonic-relative-time>
    </div>
  </section>
`)

test('{{relative-time-1}} default state is constructed', t => {
  const now = qs('#relative-time-now')
  t.equal(now.textContent, 'now')
})

test('{{relative-time-2}} default state is constructed', t => {
  const now = qs('#relative-time-then')
  t.equal(now.textContent, '5 minutes ago')
})

test('{{relative-time-3}} stand-alone ctor', t => {
  const s = new RelativeTime(NOW_MINUS_5)
  t.equal(s.toString(), '5 minutes ago')
})
