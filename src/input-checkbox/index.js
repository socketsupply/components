class InputCheckbox extends Tonic { /* global Tonic */
  constructor (props) {
    super(props)

    this.props = {
      checked: false,
      changed: false
    }

    this.defaults = {
      disabled: false,
      checked: false,
      color: 'var(--primary)',
      size: '18px',
      on: './sprite.svg#checkbox_on',
      off: './sprite.svg#checkbox_off'
    }
  }

  style () {
    return `%style%`
  }

  change (e) {
    const state = this.props.checked = !this.props.checked
    const props = { ...this.defaults, ...this.props }
    const file = props[state ? 'on' : 'off']
    const ns = 'http://www.w3.org/1999/xlink'
    this.root.querySelector('use').setAttributeNS(ns, 'xlink:href', file)
  }

  connected () {
    this.label = this.root.querySelector('label')
  }

  updated (oldProps) {
    if (oldProps.checked !== this.props.checked) {
      this.dispatchEvent(new window.Event('change'))
    }
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label for="${this.props.id}">${this.props.label}</label>`
  }

  render () {
    const {
      id,
      name,
      disabled,
      checked,
      color,
      on,
      theme,
      off,
      size
    } = { ...this.defaults, ...this.props }

    if (theme) this.classList.add(`theme-${theme}`)

    const state = checked ? on : off
    const nameAttr = name ? `name="${name}"` : ''
    const style = `fill: ${color}; color: ${color};`

    return `
      <div class="wrapper">
        <input
          type="checkbox"
          id="${id}"
          ${nameAttr}
          ${disabled ? 'disabled' : ''}
          ${checked ? 'checked' : ''}/>
        <label
          for="${id}"
          style="width: ${size}; height: ${size};">
          <svg>
            <use xlink:href="${state}" style="${style}">
          </svg>
        </label>
        ${this.renderLabel()}
      </div>
    `
  }
}

Tonic.add(InputCheckbox, { shadow: true })
