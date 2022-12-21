import { test } from 'tapzero'
import { qs } from 'qsa-min'

import { html } from '../_test/util'
import { Tonic } from '@socketsupply/tonic'
import chart from 'chart.js'
import { Components } from '..'

Components(Tonic)

// const CHART_OPTS = {
//   tooltips: {
//     enabled: false
//   },
//   legend: {
//     display: false
//   },
//   drawTicks: true,
//   drawBorder: true
// }

const CHART_DATA = {
  labels: ['Foo', 'Bar', 'Bazz'],
  datasets: [{
    label: 'Quxx (millions)',
    backgroundColor: ['#c3c3c3', '#f06653', '#8f8f8f'],
    data: [278, 467, 34]
  }]
}

document.body.appendChild(html`
<section id="chart">
  <h2>Chart</h2>

  <div id="chart-1" class="test-container">
    <span>Default</span>
    <tonic-chart
      type="horizontalBar"
      width="400px"
      height="400px"
      src="${CHART_DATA}"
      library="${chart}"
    ></tonic-chart>
  </div>
</section>
`)

test('got a chart', t => {
  const container = qs('#chart-1')
  const chart = qs('#chart-1 tonic-chart')
  const canvas = qs('#chart-1 canvas')

  t.ok(container)
  t.ok(chart)
  t.ok(canvas)

  t.ok(canvas.width >= 400)
  t.ok(canvas.height >= 400)

  const styles = window.getComputedStyle(canvas)
  t.equal(styles.display, 'block')
  t.equal(canvas.getAttribute('class'), 'chartjs-render-monitor')
})
