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

  stylesheet () {
    return `
      input-button {
        display: inline-block;
      }

      input-button .tonic--input-button--wrapper {
        margin: 5px;
      }

      input-button button {
        color: var(--primary);
        width: auto;
        min-height: 40px;
        font: 12px var(--subheader);
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 8px 8px 5px 8px;
        position: relative;
        background-color: transparent;
        border: 1px solid var(--primary);
        transition: all 0.3s ease;
        appearance: none;
        outline: none;
      }

      input-button button[disabled],
      input-button button.tonic--active {
        color: var(--medium);
        background-color: var(--background);
        border-color: var(--background);
      }

      input-button button:not([disabled]):hover,
      input-button button:not(.tonic--loading):hover {
        color: var(--window);
        background-color: var(--primary) !important;
        border-color: var(--primary) !important;
        cursor: pointer;
      }

      input-button button.tonic--loading {
        color: transparent;
        background: var(--medium);
        border-color: var(--medium);
        transition: all 0.3s ease;
        pointer-events: none;
      }

      input-button button.tonic--loading:hover {
        color: transparent;
        background: var(--medium) !important;
        border-color: var(--medium) !important;
      }

      input-button button.tonic--loading:before {
        margin-top: -8px;
        margin-left: -8px;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        opacity: 1;
        transform: translateX(-50%) translateY(-50%);
        border: 2px solid white;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear 0s infinite;
        transition: opacity 0.3s ease;
      }

      input-button button:before {
        content: '';
        width: 14px;
        height: 14px;
        opacity: 0;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `
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
      <div class="tonic--input-button--wrapper">
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
