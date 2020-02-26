const tape = require('@pre-bundled/tape')
const { qs } = require('qs')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="chart">
  <h2>Chart</h2>

  <div id="chart-1" class="test-container">
    <span>Default</span>
    <tonic-chart width=400px height=400px></tonic-chart>
  </div>
</section>
`)

tape('got a chart', t => {
  const container = qs('#chart-1')
  const chart = qs('#chart-1 tonic-chart')
  const canvas = qs('#chart-1 canvas')

  t.ok(container)
  t.ok(chart)
  t.ok(canvas)

  t.equal(canvas.width, 400)
  t.equal(canvas.height, 400)

  const styles = window.getComputedStyle(canvas)
  t.equal(styles.display, 'inline-block')

  t.end()
})
