const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class DialogBox extends Tonic {
  constructor () {
    super()
    this.stylesheet = `%style%`

    this.defaults = {
    }
  }

  render () {
    const {
      header
    } = { ...this.defaults, ...this.props }

    return `
      <div class="wrapper">
        <div class="dialog">
          <div class="dialog-header">
            ${header}
          </div>
          <h1>hello</h1>
        </div>
      </div>
    `
  }
}

Tonic.add(DialogBox)
