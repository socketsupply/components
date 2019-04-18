class TonicButton extends Tonic { /* global Tonic */
  get value () {
    return this.props.value
  }

  get disabled () {
    return this.props.disabled === true
  }

  set disabled (state) {
    this.props.disabled = state
  }

  defaults () {
    return {
      height: '40px',
      width: '150px',
      margin: '5px',
      autofocus: 'false',
      async: false,
      radius: '2px',
      borderWidth: '1px',
      textColorDisabled: 'var(--tonic-disabled)',
      backgroundColor: 'transparent'
    }
  }

  stylesheet () {
    return `
      tonic-button {
        display: inline-block;
      }

      tonic-button button {
        color: var(--tonic-button);
        width: auto;
        min-height: 40px;
        font: 12px var(--tonic-subheader);
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 8px 8px 5px 8px;
        position: relative;
        background-color: transparent;
        border: 1px solid var(--tonic-button);
        transition: all 0.3s ease;
        appearance: none;
      }

      tonic-button button[disabled],
      tonic-button button.tonic--active {
        color: var(--tonic-medium);
        background-color: var(--tonic-background);
        border-color: var(--tonic-background);
      }

      tonic-button button[disabled] {
        pointer-events: none;
        user-select: none;
      }

      tonic-button button:not([disabled]):hover,
      tonic-button button:not(.tonic--loading):hover {
        color: var(--tonic-window) !important;
        background-color: var(--tonic-button) !important;
        border-color: var(--tonic-button) !important;
        cursor: pointer;
      }

      tonic-button button.tonic--loading {
        color: transparent !important;
        background: var(--tonic-medium);
        border-color: var(--tonic-medium);
        transition: all 0.3s ease;
        pointer-events: none;
      }

      tonic-button button.tonic--loading:hover {
        color: transparent !important;
        background: var(--tonic-medium) !important;
        border-color: var(--tonic-medium) !important;
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
    const button = this.querySelector('button')
    const method = state ? 'add' : 'remove'
    if (button) button.classList[method]('tonic--loading')
  }

  click (e) {
    const disabled = this.props.disabled === 'true'
    const async = this.props.async === 'true'
    const href = this.props.href

    if (async && !disabled) {
      this.loading(true)
    }

    if (href) {
      const target = this.getAttribute('target')

      if (target && target !== '_self') {
        window.open(href)
      } else {
        window.open(href, '_self')
      }
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
      async,
      tabindex
    } = this.props

    const disabledAttr = disabled && disabled !== 'false' ? 'disabled' : ''
    const valueAttr = value ? `value="${value}"` : ''
    const typeAttr = type ? `type="${type}"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''

    let classes = []

    if (active) classes.push(`tonic--active`)
    classes = classes.join(' ')

    if (tabindex) this.removeAttribute('tabindex')

    const label = this.textContent || type || 'Button'

    const attributes = [
      valueAttr,
      typeAttr,
      tabAttr
    ].join(' ')

    return `
      <div class="tonic--button--wrapper" styles="wrapper">
        <button
          styles="button"
          async="${async}"
          ${disabledAttr}
          autofocus="${autofocus}"
          alt="${label}"
          ${attributes}
          class="${classes}">${label}</button>
      </div>
    `
  }
}

Tonic.add(TonicButton)
