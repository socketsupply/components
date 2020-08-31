const Tonic = require('@optoolco/tonic')
const { Dialog } = require('./index')

class ExampleDialog extends Dialog {
  async click (e) {
    if (Tonic.match(e.target, 'tonic-button')) {
      this.state.message = Date.now()
      this.reRender()
    }
  }

  body () {
    return this.html`
      <header>Dialog</header>
      <main>
        ${this.state.message || 'Ready'}
      </main>
      <footer>
        <tonic-button id="update">Update</tonic-button>
      </footer>
    `
  }

  loading () {
    this.state.loaded = true

    return this.html`
      <h3>Loading...</h3>
    `
  }

  async * render () {
    if (!this.state.loaded) {
      yield this.loading()
    }

    return this.body()
  }
}

Tonic.add(ExampleDialog)

const link = document.getElementById('example-dialog-link')
const dialog = document.getElementById('example-dialog')

link.addEventListener('click', e => dialog.show())
