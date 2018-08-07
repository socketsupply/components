class InputButton extends Tonic { /* global Tonic */
  constructor (props) {
    super(props)
    this.root.done = () => this.done()
  }
  defaults () {
    return {
      value: 'Submit',
      disabled: false,
      autofocus: false,
      height: '40px',
      width: '150px',
      radius: '2px'
    }
  }

  style () {
    return `%style%`
  }

  done () {
    setImmediate(() => {
      const button = this.root.querySelector('button')
      button.classList.remove('loading')
    })
  }

  click () {
    if (!this.props.async) return

    setImmediate(() => {
      const button = this.root.querySelector('button')
      button.classList.add('loading')
    })
  }

  render () {
    const {
      id,
      name,
      value,
      type,
      disabled,
      autofocus,
      isActive,
      width,
      height,
      radius,
      theme,
      fill,
      textColor
    } = this.props

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

    let classes = []
    if (isActive) classes.push(`active`)
    classes = classes.join(' ')

    return `
      <div class="wrapper">
        <button
          ${idAttr}
          ${nameAttr}
          ${valueAttr}
          ${typeAttr}
          ${disabled ? 'disabled' : ''}
          ${autofocus ? 'autofocus' : ''}
          class="${classes}"
          style="${style}">${value}</button>
      </div>
    `
  }
}

Tonic.add(InputButton)
