class TonicTextarea extends Tonic { /* global Tonic */
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
        color: var(--tonic-primary);
        width: 100%;
        font: 14px var(--tonic-monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--tonic-border);
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      tonic-textarea textarea:focus {
        border: 1px solid var(--tonic-primary);
      }

      tonic-textarea textarea:invalid {
        border-color: var(--tonic-danger);
      }

      tonic-textarea textarea[disabled] {
        background-color: var(--tonic-background);
      }

      tonic-textarea label {
        color: var(--tonic-medium);
        font-weight: 500;
        font: 12px/14px var(--tonic-subheader);
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
    if (tabindex) this.root.removeAttribute('tabindex')

    if (width) this.root.style.width = width
    if (height) this.root.style.height = height
    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

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
