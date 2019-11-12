const Tonic = require('@optoolco/tonic')
const { Dialog } = require('./index')
const sleep = n => new Promise(resolve => setTimeout(resolve, n))

class ExampleDialog extends Dialog {
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

Tonic.add(ExampleDialog)

//
// Dialog Tests
//
const tape = require('../test/tape')
const { qs } = require('qs')

tape('{{dialog-1}} is constructed properly, opens and closes properly', async t => {
  const container = qs('#dialog-1')
  const component = qs('example-dialog', container)
  const wrapper = qs('.tonic--dialog--wrapper', component)
  const close = qs('.tonic--close', component)
  const isShowingInitialState = wrapper.classList.contains('tonic--show')

  t.plan(6)

  t.equal(isShowingInitialState, false, 'the element has no show class')
  t.ok(wrapper, 'the component contains the wrapper')
  t.ok(close, 'the component contains the close button')
  t.ok(component.hasAttribute('id'), 'the component has an id')

  await component.show()

  const isShowingAfterOpen = wrapper.classList.contains('tonic--show')
  t.equal(isShowingAfterOpen, true, 'the element has been opened, has show class')

  await sleep(128)
  await component.hide()

  const isShowing = wrapper.classList.contains('tonic--show')
  t.equal(isShowing, false, 'the element has been closed, has no show class')

  t.end()
})
