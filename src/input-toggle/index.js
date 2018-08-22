class InputToggle extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.props.checked }
    })
  }

  defaults () {
    return {
      checked: false
    }
  }

  style () {
    return {
      '.tonic--wrapper': {
        height: '30px',
        width: '47px',
        position: 'relative'
      },
      '.tonic--wrapper > label': {
        color: 'var(--medium)',
        fontWeight: '500',
        font: '12px/14px var(--subheader)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginLeft: '58px',
        paddingTop: '9px',
        display: 'block',
        userSelect: 'none'
      },
      '.tonic--switch': {
        position: 'absolute',
        left: '0',
        top: '0'
      },
      '.tonic--switch label:before': {
        font: 'bold 12px var(--subheader)',
        textTransform: 'uppercase'
      },
      'input.tonic--toggle': {
        position: 'absolute',
        display: 'none',
        outline: 'none',
        userSelect: 'none',
        zIndex: '1'
      },
      'input.tonic--toggle + label': {
        width: '42px',
        height: '24px',
        padding: '2px',
        display: 'block',
        position: 'relative',
        backgroundColor: 'var(--border)',
        borderRadius: '60px',
        transition: 'background 0.4s ease-in-out',
        cursor: 'default'
      },
      'input.tonic--toggle + label:before': {
        content: '""',
        lineHeight: '29px',
        textIndent: '29px',
        position: 'absolute',
        top: '1px',
        left: '1px',
        right: '1px',
        bottom: '1px',
        display: 'block',
        borderRadius: '60px',
        transition: 'background 0.4s ease-in-out',
        paddingTop: '1px',
        fontSize: '0.65em',
        letterSpacing: '0.05em',
        backgroundColor: 'var(--border)'
      },
      'input.tonic--toggle + label:after': {
        content: '""',
        width: '16px',
        position: 'absolute',
        top: '4px',
        left: '4px',
        bottom: '4px',
        backgroundColor: 'var(--window)',
        borderRadius: '52px',
        transition: 'background 0.4s ease-in-out, margin 0.4s ease-in-out',
        display: 'block',
        zIndex: '2'
      },
      'input.tonic--toggle:disabled': {
        cursor: 'default',
        backgroundColor: 'var(--background)'
      },
      'input.tonic--toggle:disabled + label': {
        cursor: 'default',
        backgroundColor: 'var(--background)'
      },
      'input.tonic--toggle:disabled + label:before': {
        backgroundColor: 'var(--background)'
      },
      'input.tonic--toggle:disabled + label:after': {
        backgroundColor: 'var(--window)'
      },
      'input.tonic--toggle:checked + label': {
        backgroundColor: 'var(--accent)'
      },
      'input.tonic--toggle:checked + label:before': {
        content: '""',
        backgroundColor: 'var(--accent)',
        color: 'var(--background)'
      },
      'input.tonic--toggle:checked + label:after': {
        marginLeft: '18px',
        backgroundColor: 'var(--background)'
      }
    }
  }

  change (e) {
    this.props.checked = !this.props.checked
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label for="${this.props.id}">${this.props.label}</label>`
  }

  render () {
    const {
      id,
      disabled,
      theme,
      checked
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    //
    // the id attribute can be removed to the input
    // and added to the input inside the component.
    //
    this.root.removeAttribute('id')

    return `
      <div class="tonic--wrapper">
        <div class="tonic--switch">
          <input
            type="checkbox"
            class="tonic--toggle"
            id="${id}"
            ${disabled ? 'disabled' : ''}
            ${checked ? 'checked' : ''}>
          <label for="${id}"></label>
        </div>
        ${this.renderLabel()}
      </div>
    `
  }
}

Tonic.add(InputToggle)
