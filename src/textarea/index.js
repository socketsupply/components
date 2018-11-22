class TonicTextarea extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    const that = this

    Object.defineProperty(this.root, 'value', {
      get () { return that.value },
      set (value) { that.value = value }
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
      tonic-textarea textarea {
        color: var(--primary);
        width: 100%;
        font: 14px var(--monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--border);
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      tonic-textarea textarea:focus {
        border: 1px solid var(--primary);
      }

      tonic-textarea textarea:invalid {
        border-color: var(--danger);
      }

      tonic-textarea textarea[disabled] {
        background-color: var(--background);
      }

      tonic-textarea label {
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

  set value (value) {
    this.root.querySelector('textarea').value = value
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
      width,
      height,
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
      tabindex,
      theme
    } = this.props

    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const rowsAttr = rows ? `rows="${rows}"` : ''
    const colsAttr = cols ? `cols="${cols}"` : ''
    const minAttr = minlength ? `minlength="${minlength}"` : ''
    const maxAttr = maxlength ? `maxlength="${maxlength}"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''

    if (width) this.root.style.width = width
    if (height) this.root.style.width = height
    if (theme) this.root.classList.add(`tonic--theme--${theme}`)
    if (tabindex) this.root.removeAttribute('tabindex')

    if (this.props.value === 'undefined') this.props.value = ''

    const attributes = [
      placeholderAttr,
      spellcheckAttr,
      disabled,
      required,
      readonly,
      autofocus,
      rowsAttr,
      colsAttr,
      minAttr,
      maxAttr,
      disabledAttr,
      tabAttr
    ].join(' ')

    return `
      <div class="tonic--wrapper">
        ${this.renderLabel()}
        <textarea styles="textarea" ${attributes}>${this.props.value}</textarea>
      </div>
    `
  }
}

Tonic.add(TonicTextarea)
