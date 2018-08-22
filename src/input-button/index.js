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
      radius: '2px',
      textColor: 'var(--primary)',
      backgroundColor: 'transparent',
      borderColor: 'var(--primary)'
    }
  }

  style () {
    // if (this.props.width === 100%) {
    // TODO display block (on component)
    // }

    return {
      '': {
        display: 'inline-block'
      },
      '.tonic--wrapper': {
        margin: '5px'
      },
      'button': {
        color: this.props.textColor,
        width: this.props.width,
        height: this.props.height,
        minHeight: '40px',
        font: '12px var(--subheader)',
        fontWeight: '400',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        padding: '8px 8px 5px 8px',
        position: 'relative',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: this.props.borderColor,
        borderRadius: this.props.radius,
        backgroundColor: this.props.backgroundColor,
        outline: 'none',
        transition: 'all 0.3s ease',
        appearance: 'none'
      },
      'button:before': {
        content: '""',
        width: '14px',
        height: '14px',
        opacity: '0'
      },
      'button[disabled], button.tonic--active': {
        color: 'var(--medium)',
        backgroundColor: 'var(--background)',
        borderColor: 'var(--background)'
      },
      'button:not([disabled]):hover, button:not(.tonic--loading):hover': {
        color: 'var(--window)',
        backgroundColor: 'var(--primary) !important',
        borderColor: 'var(--primary) !important',
        cursor: 'pointer'
      },
      'button.tonic--loading': {
        color: 'transparent',
        background: 'var(--medium)',
        borderColor: 'var(--medium)',
        pointerEvents: 'none',
        transition: 'all 0.3s ease'
      },
      'button.tonic--loading:hover': {
        color: 'transparent',
        background: 'var(--medium) !important',
        borderColor: 'var(--medium) !important'
      },
      'button.tonic--loading:before': {
        marginTop: '-8px',
        marginLeft: '-8px',
        display: 'inline-block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        opacity: '1',
        '-webkit-transform': 'translateX(-50%) translateY(-50%)',
        '-ms-transform': 'translateX(-50%) translateY(-50%)',
        transform: 'translateX(-50%) translateY(-50%)',
        border: '2px solid white',
        borderRadius: '50%',
        borderTopColor: 'transparent',
        animation: 'spin 1s linear 0s infinite',
        transition: 'opacity 0.3s ease'
      }
    }
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

  render () {
    const {
      id,
      name,
      value,
      type,
      disabled,
      autofocus,
      active,
      theme
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    const idAttr = id ? `id="${id}"` : ''
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
          ${idAttr}
          ${nameAttr}
          ${valueAttr}
          ${typeAttr}
          ${disabled ? 'disabled' : ''}
          ${autofocus ? 'autofocus' : ''}
          class="${classes}">
          ${label}
        </button>
      </div>
    `
  }
}

Tonic.add(InputButton)
