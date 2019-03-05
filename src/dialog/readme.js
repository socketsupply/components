class TonicDialog extends Tonic.Dialog {
  willConnect () {
    this.state.message = this.props.message
  }

  click (e) {
    if (!Tonic.match(e.target, '#update')) return

    this.setState(state => ({
      ...state,
      message: `Date stamp ${Date.now()}`
    }))

    this.reRender()
  }

  render () {
    return `
      <header>Dialog</header>
      <main>
        ${this.state.message}
      </main>
      <footer>
        <tonic-button id="update">Update</tonic-button>
      </footer>
    `
  }
}

Tonic.add(TonicDialog)

const link = document.getElementById('example-dialog-link')
const dialog = document.getElementById('example-dialog')

link.addEventListener('click', e => dialog.show())
