const Tonic = require('@optoolco/tonic')

class ShowRandom extends Tonic {
  async click (e) {
    if (Tonic.match(e.target, '#update')) {
      this.state.message = String(Math.random())
      this.reRender()
    }
  }

  render () {
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
}

Tonic.add(ShowRandom)

const link = document.getElementById('example-dialog-link')
const dialog = document.getElementById('example-dialog')

link.addEventListener('click', async e => {
  await dialog.reRender()
  await dialog.show()
})
