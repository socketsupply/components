class InputButton extends Tonic { /* global Tonic */
  constructor (props) {
    super(props)

    this.defaults = {
      value: 'Submit',
      type: 'submit',
      disabled: false,
      autofocus: false,
      height: '38px',
      width: '150px',
      radius: '2px'
    }
  }

  style () {
    return `%style%`
  }

  render () {
    const {
      id,
      name,
      value,
      type,
      disabled,
      autofocus,
      isLoading,
      isActive,
      width,
      height,
      radius,
      theme,
      fill,
      textColor
    } = { ...this.defaults, ...this.props }

    if (theme) this.root.classList.add(`theme-${theme}`)

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const valueAttr = value ? `value="${value}"` : ''
    const typeAttr = type ? `type="${type}"` : ''

    let style = []
    if (width) style.push(`width: ${width}`)
    if (height) style.push(`height: ${height}`)
    if (radius) style.push(`border-radius: ${radius}`)
    if (fill) {
      style.push(`background-color: ${fill}`)
      style.push(`border-color: ${fill}`)
    }
    if (textColor) style.push(`color: ${textColor}`)
    style = style.join('; ')

    return `
      <div class="wrapper">
        <button
          ${idAttr}
          ${nameAttr}
          ${valueAttr}
          ${typeAttr}
          ${disabled ? 'disabled' : ''}
          ${autofocus ? 'autofocus' : ''}
          ${isLoading ? 'class="loading"' : ''}
          ${isActive ? 'class="active"' : ''}
          style="${style}">${value}</button>
      </div>
    `
  }
}

Tonic.add(InputButton)
