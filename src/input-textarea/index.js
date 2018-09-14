class InputTextarea extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.value }
    })
  }

  defaults () {
    return {
      placeholder: '',
      spellcheck: true,
      disabled: false,
      required: false,
      readonly: false,
      autofocus: false,
      width: '100%',
      radius: '2px'
    }
  }

  stylesheet () {
    return `
      input-textarea textarea {
        color: var(--primary);
        width: 100%;
        font: 14px var(--monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--border);
        outline: none;
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      input-textarea textarea:focus {
        border: 1px solid var(--primary);
      }

      input-textarea textarea:invalid {
        border-color: var(--danger);
      }

      input-textarea textarea[disabled] {
        background-color: var(--background);
      }

      input-textarea label {
        color: var(--medium);
        font-weight: 500;
        font: 12px/14px var(--subheader);
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }
    `
  }

  styles () {
    const {
      width,
      radius,
      resize
    } = this.props

    return {
      textarea: {
        width,
        borderRadius: radius,
        resize: resize
      }
    }
  }

  get value () {
    return this.root.querySelector('textarea').value
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  willConnect () {
    this.props.value = this.props.value || this.root.textContent
  }

  render () {
    const {
      name,
      placeholder,
      spellcheck,
      disabled,
      required,
      readonly,
      autofocus,
      rows,
      cols,
      minlength,
      maxlength,
      theme
    } = this.props

    const nameAttr = name ? `name="${name}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const rowsAttr = rows ? `rows="${rows}"` : ''
    const colsAttr = cols ? `cols="${cols}"` : ''
    const minAttr = minlength ? `minlength="${minlength}"` : ''
    const maxAttr = maxlength ? `maxlength="${maxlength}"` : ''

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    if (this.props.value === 'undefined') this.props.value = ''

    const attributes = `
      ${nameAttr}
      ${placeholderAttr}
      ${spellcheckAttr}
      ${disabled}
      ${required}
      ${readonly}
      ${autofocus}
      ${rowsAttr}
      ${colsAttr}
      ${minAttr}
      ${maxAttr}
    `

    return `
      <div class="tonic--wrapper">
        ${this.renderLabel()}
        <textarea styles="textarea"${attributes}>${this.props.value}</textarea>
      </div>
    `
  }
}

Tonic.add(InputTextarea)
