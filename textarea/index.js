const Tonic = require('@optoolco/tonic')

class TonicTextarea extends Tonic {
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
    return this.querySelector('textarea').value
  }

  set value (value) {
    this.querySelector('textarea').value = value
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label for="tonic--textarea_${this.props.id}">${this.props.label}</label>`
  }

  willConnect () {
    this.props.value = this.props.value || this.textContent
  }

  render () {
    const {
      ariaLabelledby,
      autofocus,
      cols,
      height,
      disabled,
      label,
      maxlength,
      minlength,
      name,
      placeholder,
      readonly,
      required,
      rows,
      spellcheck,
      tabindex,
      theme,
      width
    } = this.props

    const ariaLabelAttr = label ? `aria-label="${label}"` : ''
    const ariaLabelledByAttr = ariaLabelledby ? `aria-labelledby="${ariaLabelledby}"` : ''
    const colsAttr = cols ? `cols="${cols}"` : ''
    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''
    const maxAttr = maxlength ? `maxlength="${maxlength}"` : ''
    const minAttr = minlength ? `minlength="${minlength}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const rowsAttr = rows ? `rows="${rows}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''
    const autofocusAttr = autofocus ? 'autofocus' : ''
    const requiredAttr = required ? 'required' : ''
    const readonlyAttr = readonly ? 'readonly' : ''

    if (ariaLabelledByAttr) this.removeAttribute('ariaLabelled')
    if (width) this.style.width = width
    if (height) this.style.height = height
    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)
    if (name) this.removeAttribute('name')

    if (this.props.value === 'undefined') this.props.value = ''

    const attributes = [
      ariaLabelAttr,
      ariaLabelledByAttr,
      autofocusAttr,
      colsAttr,
      disabledAttr,
      maxAttr,
      minAttr,
      nameAttr,
      placeholderAttr,
      readonlyAttr,
      requiredAttr,
      rowsAttr,
      spellcheckAttr,
      tabAttr
    ].join(' ')

    return `
      <div class="tonic--wrapper">
        ${this.renderLabel()}
        <textarea
          styles="textarea"
          id="tonic--textarea_${this.props.id}"
          ${attributes}>${this.props.value}</textarea>
      </div>
    `
  }
}

module.exports = { TonicTextarea }
