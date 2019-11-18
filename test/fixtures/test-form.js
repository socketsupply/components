'use strict'

const Tonic = require('@optoolco/tonic')

class TestForm extends Tonic {
  constructor (o) {
    super(o)

    this.state = {
      text: '',
      ...this.state
    }
  }

  click (ev) {
    const el = Tonic.match(ev.target, '[data-event]')
    if (!el) return

    if (el.dataset.event === 'submit') {
      const input = this.querySelector('#test-form-input')

      this.state.text = input.value
      this.reRender()
    }
  }

  submit (ev) {
    ev.preventDefault()
  }

  render () {
    const text = this.state.text

    return this.html`
      <form class='tc-test-form'>
        <span>Text is: ${text}</span>
        <tonic-input
          id='test-form-input'
          name='test-form-input'
        ></tonic-input>
        <tonic-button async="true" data-event='submit'>
          Submit
        </tonic-button>
     </form>
    `
  }
}

Tonic.add(TestForm)
