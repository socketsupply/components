const Tonic = require('@optoolco/tonic')

class TonicTextarea extends Tonic {
  mutate (e) {
    const { width, height } = e.target.style

    this.state = {
      ...this.state,
      width,
      height
    }
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

  static stylesheet () {
    return `
      tonic-textarea textarea {
        color: var(--tonic-primary, #333);
        width: 100%;
        font: 14px var(--tonic-monospace, 'Andale Mono', monospace);
        padding: 10px;
        background-color: var(--tonic-input-background, var(--tonic-background, transparent));
        border: 1px solid var(--tonic-border, #ccc);
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      tonic-textarea textarea:invalid {
        border-color: var(--tonic-danger, #f66);
      }

      tonic-textarea textarea:focus {
        outline: none;
        background-color: var(--tonic-input-background-focus, rgba(241, 241, 241, 0.75));
      }

      tonic-textarea textarea[disabled] {
        background-color: var(--tonic-background, #fff);
      }

      tonic-textarea label {
        color: var(--tonic-medium, #999);
        font-weight: 500;
        font: 12px/14px var(--tonic-subheader,  'Arial', sans-serif);
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }
    `
  }

  styles () {
    const {
      width = this.state.width,
      height = this.state.height,
      radius,
      resize
    } = this.props

    return {
      textarea: {
        width,
        height,
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
    if (typeof this.props.label === 'undefined') return ''
    return this.html`
      <label
        for="tonic--textarea_${this.props.id}"
      >${this.props.label}</label>
    `
  }

  willConnect () {
    const {
      value,
      persistSize
    } = this.props

    this.props.value = typeof value === 'undefined' ? this.textContent : value

    if (persistSize === 'true') {
      const cb = (changes) => this.mutate(changes.pop())
      this.observer = new window.MutationObserver(cb).observe(this, {
        attributes: true, subtree: true, attributeFilter: ['style']
      })
    }
  }

  disconnected () {
    if (this.observer) {
      this.observer.disconnect()
    }
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

    if (ariaLabelledby) this.removeAttribute('ariaLabelled')
    if (width) this.style.width = width
    if (height) this.style.height = height
    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)
    if (name) this.removeAttribute('name')

    if (this.props.value === 'undefined') this.props.value = ''

    return this.html`
      <div class="tonic--wrapper">
        ${this.renderLabel()}
        <textarea ... ${{
          styles: 'textarea',
          id: `tonic--textarea_${this.props.id}`,
          'aria-label': label,
          'aria-labelledby': ariaLabelledby,
          cols,
          disabled: disabled === 'true',
          maxlength,
          minlength,
          name,
          placeholder,
          rows,
          spellcheck,
          tabindex,
          autofocus,
          required,
          readonly
        }}>${this.props.value}</textarea>
      </div>
    `
  }
}

module.exports = { TonicTextarea }
