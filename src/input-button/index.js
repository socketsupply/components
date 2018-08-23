class InputButton extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)
    this.root.loading = (state) => this.loading(state)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.props.value }
    })
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

  loading (state) {
    window.requestAnimationFrame(() => {
      const button = this.root.querySelector('button')
      const method = state ? 'add' : 'remove'
      if (button) button.classList[method]('tonic--loading')
    })
  }

  click () {
    if (!this.props.async) return
    this.loading(true)
  }

  connected () {
    const {
      width,
      height,
      radius,
      fill,
      textColor
    } = this.props

    const button = this.root.querySelector('button')

    if (width) button.style.width = width
    if (height) button.style.height = height
    if (radius) button.style.borderRadius = radius

    if (fill) {
      button.style.backgroundColor = fill
      button.style.borderColor = fill
    }

    if (textColor) button.style.color = textColor
  }

  render () {
    const {
      name,
      value,
      type,
      disabled,
      autofocus,
      active,
      theme
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    const nameAttr = name ? `name="${name}"` : ''
    const valueAttr = value ? `value="${value}"` : ''
    const typeAttr = type ? `type="${type}"` : ''

    let classes = []
    if (active) classes.push(`tonic--active`)
    classes = classes.join(' ')

    const label = this.root.textContent || value

    return `
      <div class="tonic--wrapper">
        <button
          ${nameAttr}
          ${valueAttr}
          ${typeAttr}
          ${disabled ? 'disabled' : ''}
          ${autofocus ? 'autofocus' : ''}
          class="${classes}">${label}</button>
      </div>
    `
  }
}

Tonic.add(InputButton)
