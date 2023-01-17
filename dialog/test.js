import { test } from 'tapzero'
import { qs } from 'qsa-min'
import { html } from '../_test/util'

import { Tonic } from '@socketsupply/tonic'
import { Components } from '..'

Components(Tonic)

class DialogInner extends Tonic {
  async click (e) {
    return Tonic.match(e.target, 'tonic-button')
  }

  render () {
    return `
      <header>Dialog</header>
      <main>
        ${this.props.message || 'Ready'}
      </main>
      <footer>
        <tonic-button class="tonic--close" id="close">Close</tonic-button>
      </footer>
    `
  }
}

Tonic.add(DialogInner, 'dialog-inner')

document.body.appendChild(html`
<section id="dialog">
  <h2>Dialog</h2>

  <div id="dialog-1" class="test-container">
    <span>Default Dialog</span>
    <tonic-button id="dialog-default-button">Open</tonic-button>
    <tonic-dialog id="dialog-default">
      <dialog-inner message="Hello!"></dialog-inner>
    </tonic-dialog>
  </div>

</section>
`)

//
// Dialog Tests
//

test('{{dialog-1}} is constructed properly, opens and closes properly', async t => {
  const container = qs('#dialog-1')
  const component = qs('#dialog-default', container)
  const isShowingInitialState = component.classList.contains('tonic--show')

  t.equal(isShowingInitialState, false, 'the element has no show class')
  t.ok(component.hasAttribute('id'), 'the component has an id')

  const styles = window.getComputedStyle(component)
  t.equal(styles.position, 'absolute')

  await component.show()

  const close = qs('.tonic--dialog--close', component)
  t.ok(close, 'the component contains the close button')

  const isShowingAfterOpen = component.classList.contains('tonic--show')
  t.equal(isShowingAfterOpen, true, 'the element has been opened, has show class')

  await component.hide()

  const isShowing = component.classList.contains('tonic--show')
  t.equal(isShowing, false, 'the element has been closed, has no show class')
})
