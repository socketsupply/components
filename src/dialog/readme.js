class MyDialog extends Tonic.Dialog {
  click (e) {
    if (!e.target.value) return

    const color = Math.random().toString(16).slice(2, 8)

    this.setProps(props => ({
      ...props,
      color,
      message: `Random Color #${color}`
    }))
  }

  render () {
    return `
      <header>
        Dialog
      </header>
      <main>
        <p style="color: #${this.props.color};">${this.props.message}</p>
      </main>
      <footer>
        <input-button value="increment">Random Color</input-button>
      </footer>
    `
  }
}

Tonic.add(MyDialog)

const link = document.getElementById('example-dialog-link')
const dialog = document.getElementById('example-dialog')

link.addEventListener('click', e => dialog.show())
