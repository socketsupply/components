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
    return `
      input-toggle .tonic--toggle--wrapper {
        height: 30px;
        width: 47px;
        position: relative;
      }

      input-toggle .tonic--toggle--wrapper > label {
        color: var(--medium);
        font-weight: 500;
        font: 12px/14px var(--subheader);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-left: 58px;
        padding-top: 9px;
        display: block;
        user-select: none;
      }

      input-toggle .tonic--switch {
        position: absolute;
        left: 0;
        top: 0;
      }

      input-toggle .tonic--switch label:before {
        font: bold 12px var(--subheader);
        text-transform: uppercase;
      }

      input-toggle input.tonic--toggle {
        position: absolute;
        display: none;
        outline: none;
        user-select: none;
        z-index: 1;
      }

      input-toggle input.tonic--toggle + label {
        width: 42px;
        height: 24px;
        padding: 2px;
        display: block;
        position: relative;
        background-color: var(--border);
        border-radius: 60px;
        transition: background 0.4s ease-in-out;
        cursor: default;
      }

      input-toggle input.tonic--toggle + label:before {
        content: '';
        line-height: 29px;
        text-indent: 29px;
        position: absolute;
        top: 1px;
        left: 1px;
        right: 1px;
        bottom: 1px;
        display: block;
        border-radius: 60px;
        transition: background 0.4s ease-in-out;
        padding-top: 1px;
        font-size: 0.65em;
        letter-spacing: 0.05em;
        background-color: var(--border);
      }

      input-toggle input.tonic--toggle + label:after {
        content: '';
        width: 16px;
        position: absolute;
        top: 4px;
        left: 4px;
        bottom: 4px;
        background-color: var(--window);
        border-radius: 52px;
        transition: background 0.4s ease-in-out, margin 0.4s ease-in-out;
        display: block;
        z-index: 2;
      }

      input-toggle input.tonic--toggle:disabled {
        cursor: default;
        background-color: var(--background);
      }

      input-toggle input.tonic--toggle:disabled + label {
        cursor: default;
        background-color: var(--background);
      }

      input-toggle input.tonic--toggle:disabled + label:before {
        background-color: var(--background);
      }

      input-toggle input.tonic--toggle:disabled + label:after {
        background-color: var(--window);
      }

      input-toggle input.tonic--toggle:checked + label
        background-color: var(--accent);
      }

      input-toggle input.tonic--toggle:checked + label:before
        content: '';
        background-color: var(--accent);
        color: var(--background);
      }

      input-toggle input.tonic--toggle:checked + label:after
        margin-left: 18px;
        background-color: var(--background);
      }

    `
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
      <div class="tonic--toggle--wrapper">
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
