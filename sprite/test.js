import { test } from 'tapzero'
import { qs } from 'qsa-min'
import { html } from '../_test/util'
import { Tonic } from '@socketsupply/tonic'
import { Components } from '..'

Components(Tonic)

document.body.appendChild(html`
<section id="sprite">
  <tonic-sprite></tonic-sprite>
  <h2>Sprite</h2>

  <!-- Default inline toaster -->
  <div class="test-container">
    <span>Sprite</span>
    <svg id="svg-close">
      <use href="#close" xlink:href="#close"></use>
    </svg>
  </div>

</section>
`)

test('test an icon', t => {
  const svg = qs('#svg-close')
  const use = qs('use', svg)

  t.ok(svg)
  t.ok(svg.querySelector('use'))

  const size = use.getBoundingClientRect()
  t.equal(Math.floor(size.height), 92)
  t.equal(Math.floor(size.width), 92)

  const sprite = qs('tonic-sprite')
  t.ok(sprite)

  const spriteSize = sprite
    .querySelector('svg')
    .getBoundingClientRect()
  t.equal(spriteSize.height, 0)
})
