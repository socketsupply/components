class InputCheckbox extends Tonic { /* global Tonic */
  defaults () {
    return {
      disabled: false,
      checked: false,
      size: '18px',
      onIcon: InputCheckbox.svg.onIcon,
      offIcon: InputCheckbox.svg.offIcon
    }
  }

  style () {
    return `%style%`
  }

  change (e) {
    const state = this.props.checked = !this.props.checked
    const props = { ...this.defaults, ...this.props }
    const file = props[state ? 'onIcon' : 'offIcon']
    const url = `url("${file('red')}"), url("fallback.svg")`
    this.root.querySelector('label.icon').style.backgroundImage = url
  }

  connected () {
    this.label = this.root.querySelector('label')
  }

  updated (oldProps) {
    if (oldProps.checked !== this.props.checked) {
      this.root.dispatchEvent(new window.Event('change'))
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
      theme,
      size
    } = this.props

    if (theme) this.classList.add(`theme-${theme}`)

    const nameAttr = name ? `name="${name}"` : ''

    const computedStyles = window.getComputedStyle(this.root)
    const colorAttr = color || computedStyles.getPropertyValue('--primary')

    //
    // the id attribute can be removed to the input
    // and added to the input inside the component.
    //
    this.root.removeAttribute('id')

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
          class="icon"
          style="
            width: ${size};
            height: ${size};
            background-image: url('${this.props.offIcon(colorAttr)}');">
        </label>
        ${this.renderLabel()}
      </div>
    `
  }
}

InputCheckbox.svg = {}

InputCheckbox.svg.onIcon = (color) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path fill="${color}" d="M79.7,1H21.3C10.4,1,1.5,9.9,1.5,20.8v58.4C1.5,90.1,10.4,99,21.3,99h58.4c10.9,0,19.8-8.9,19.8-19.8V20.8C99.5,9.9,90.6,1,79.7,1z M93.3,79.3c0,7.5-6.1,13.6-13.6,13.6H21.3c-7.5,0-13.6-6.1-13.6-13.6V20.9c0-7.5,6.1-13.6,13.6-13.6V7.2h58.4c7.5,0,13.6,6.1,13.6,13.6V79.3z"/>
      <polygon fill="${color}" points="44,61.7 23.4,41.1 17.5,47 44,73.5 85.1,32.4 79.2,26.5 "/>
    </svg>
  `
  return `data:image/svg+xml;base64,${window.btoa(svg)}`
}

InputCheckbox.svg.offIcon = (color) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path fill="${color}" d="M79.7,99H21.3C10.4,99,1.5,90.1,1.5,79.2V20.8C1.5,9.9,10.4,1,21.3,1h58.4c10.9,0,19.8,8.9,19.8,19.8v58.4C99.5,90.1,90.6,99,79.7,99z M21.3,7.3c-7.5,0-13.6,6.1-13.6,13.6v58.4c0,7.5,6.1,13.6,13.6,13.6h58.4c7.5,0,13.6-6.1,13.6-13.6V20.8c0-7.5-6.1-13.6-13.6-13.6H21.3V7.3z"/>
    </svg>
  `
  return `data:image/svg+xml;base64,${window.btoa(svg)}`
}

Tonic.add(InputCheckbox)
