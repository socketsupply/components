class TonicButton extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)
    this.root.loading = (state) => this.loading(state)

    const that = this

    Object.defineProperty(this.root, 'value', {
      get () { return that.props.value }
    })

    Object.defineProperty(this.root, 'disabled', {
      get () { return that.props.disabled === 'true' },
      set (state) { that.props.disabled = state }
    })
  }

  defaults () {
    return {
      value: 'Submit',
      height: '40px',
      width: '150px',
      margin: '5px',
      disabled: false,
      autofocus: false,
      async: false,
      radius: '2px',
      borderWidth: '1px',
      textColorDisabled: 'var(--disabled)',
      backgroundColor: 'transparent'
    }
  }

  stylesheet () {
    return `
      tonic-button {
        display: inline-block;
      }

      tonic-button button {
        color: var(--button);
        width: auto;
        min-height: 40px;
        font: 12px var(--subheader);
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 8px 8px 5px 8px;
        position: relative;
        background-color: transparent;
        border: 1px solid var(--button);
        transition: all 0.3s ease;
        appearance: none;
      }

      tonic-button button[disabled],
      tonic-button button.tonic--active {
        color: var(--medium);
        background-color: var(--background);
        border-color: var(--background);
      }

      tonic-button button[disabled] {
        pointer-events: none;
        user-select: none;
      }

      tonic-button button:not([disabled]):hover,
      tonic-button button:not(.tonic--loading):hover {
        color: var(--window) !important;
        background-color: var(--button) !important;
        border-color: var(--button) !important;
        cursor: pointer;
      }

      tonic-button button.tonic--loading {
        color: transparent !important;
        background: var(--medium);
        border-color: var(--medium);
        transition: all 0.3s ease;
        pointer-events: none;
      }

      tonic-button button.tonic--loading:hover {
        color: transparent !important;
        background: var(--medium) !important;
        border-color: var(--medium) !important;
      }

      tonic-button button.tonic--loading:before {
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

      tonic-button button:before {
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
      if (!this.root) return
      const button = this.root.querySelector('button')
      const method = state ? 'add' : 'remove'
      if (button) button.classList[method]('tonic--loading')
    })
  }

  click () {
    const disabled = this.props.disabled === 'true'
    const async = this.props.async

    if (async && !disabled) {
      this.loading(true)
    }
  }

  styles () {
    const {
      width,
      height,
      margin,
      radius,
      fill,
      disabled,
      borderColor,
      borderWidth,
      textColor,
      textColorDisabled
    } = this.props

    return {
      button: {
        width,
        height,
        color: disabled && disabled === 'true' ? textColorDisabled : textColor,
        backgroundColor: fill,
        borderRadius: radius,
        borderColor: fill || borderColor,
        borderWidth: borderWidth
      },
      wrapper: {
        width,
        height,
        margin
      }
    }
  }

  render () {
    const {
      value,
      type,
      disabled,
      autofocus,
      active,
      theme,
      async,
      tabindex,
      href
    } = this.props

    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''
    const valueAttr = value ? `value="${value}"` : ''
    const typeAttr = type ? `type="${type}"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''

    let classes = []

    if (active) classes.push(`tonic--active`)
    classes = classes.join(' ')

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)
    if (tabindex) this.root.removeAttribute('tabindex')
    if (href) {
      this.root.addEventListener('click', e => {
        e.preventDefault()
        window.location.href = href
      })
    }

    const label = this.root.textContent || value

    const attributes = [
      valueAttr,
      typeAttr,
      disabledAttr,
      autofocus,
      tabAttr
    ].join(' ')

    return `
      <div class="tonic--button--wrapper" styles="wrapper">
        <button
          styles="button"
          async="${async}"
          alt="${label}"
          ${attributes}
          class="${classes}">${label}</button>
      </div>
    `
  }
}

Tonic.add(TonicButton)
