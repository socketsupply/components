
const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="popover">
  <h2>Popover</h2>

  <!-- Popover Default -->
  <div class="test-container">
    <span>Default Popover</span>
    <tonic-button id="tonic-popover-default-button">
      Open Popover
    </tonic-button>
  </div>

  <tonic-popover
    id="tonic-popover-default"
    width="175px"
    for="tonic-popover-default-button">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </tonic-popover>

</section>
`)

//
// Panel Default
//
const popover = document.getElementById('tonic-popover-default')
popover.addEventListener('show', event => {
  document.body.addEventListener('click', e => {
    popover.hide()
  }, { once: true })
})

// TODO: write tests for popover.
