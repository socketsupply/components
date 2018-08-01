const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class InputToggle extends Tonic {
  constructor () {
    super()
    this.stylesheet = `%style%`

    this.defaults = {
      disabled: false,
      checked: false
    }
  }

  change (e) {
    this.props.checked = !this.props.checked
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  render () {
    const {
      id,
      name,
      disabled,
      checked
    } = { ...this.defaults, ...this.props }

    const nameAttr = name ? `name="${name}"` : ''

    return `
      <div class="wrapper">
        <div class="switch">
          <input
            type="checkbox"
            class="toggle"
            id="${id}"
            ${nameAttr}
            ${disabled ? 'disabled' : ''}
            ${checked ? 'checked' : ''}>
          <label for="${id}"></label>
        </div>
        ${this.renderLabel()}
      </div>
    `
  }
}

Tonic.add(InputToggle, { shadow: true })
