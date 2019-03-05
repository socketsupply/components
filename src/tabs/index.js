class XTronicSelect extends Tonic { /* global Tonic */
  /* defaults () {
    return {
      disabled: false,
      iconArrow: TonicSelect.svg.default(),
      width: '250px',
      radius: '2px'
    }
  }

  stylesheet () {
    return `
      tonic-select .tonic--wrapper {
        position: relative;
      }

      tonic-select .tonic--wrapper:before {
        content: '';
        width: 14px;
        height: 14px;
        opacity: 0;
        z-index: 1;
      }

      tonic-select.tonic--loading {
        pointer-events: none;
        transition: background 0.3s ease;
      }

      tonic-select.tonic--loading select {
        color: transparent;
        background-color: var(--tonic-window);
        border-color: var(--tonic-border);
      }

      tonic-select.tonic--loading .tonic--wrapper:before {
        margin-top: -8px;
        margin-left: -8px;
        display: block;
        position: absolute;
        bottom: 10px;
        left: 50%;
        opacity: 1;
        transform: translateX(-50%);
        border: 2px solid var(--tonic-medium);
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear 0s infinite;
        transition: opacity 0.3s ease;
      }

      tonic-select select {
        color: var(--tonic-primary);
        font: 14px var(--tonic-monospace);
        background-color: var(--tonic-window);
        background-repeat: no-repeat;
        background-position: center right;
        border: 1px solid var(--tonic-border);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        position: relative;
      }

      tonic-select select:not([multiple]) {
        padding: 10px 30px 10px 10px;
      }

      tonic-select select[disabled] {
        background-color: var(--tonic-background);
      }

      tonic-select label {
        color: var(--tonic-medium);
        font: 12px/14px var(--tonic-subheader);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }

      tonic-select[multiple] select {
        background-image: none !important;
      }

      tonic-select[multiple] select option {
        padding: 6px 10px;
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

  get value () {
    if (!this.root) return
    const el = this.root.querySelector('select')

    if (this.props.multiple === 'true') {
      const value = [...el.options]
        .filter(el => el.selected)
        .map(el => el.getAttribute('value'))
      return value
    }

    return el.value
  }

  selectOptions (value) {
    if (!this.root) return
    const el = this.root.querySelector('select')
    const options = [...el.options]

    options.forEach(el => {
      el.selected = value.findIndex(v => v === el.value) > -1
    })
  }

  set value (value) {
    if (!this.root) return

    if (this.props.multiple === 'true' && Array.isArray(value)) {
      this.selectOptions(value)
    } else {
      if (!value) value = 0 // if a falsy value
      const el = this.root.querySelector('select')
      el.selectedIndex = value
    }
  }

  get option () {
    if (!this.root) return
    const node = this.root.querySelector('select')
    return node.options[node.selectedIndex]
  }

  get selectedIndex () {
    if (!this.root) return
    const node = this.root.querySelector('select')
    return node.selectedIndex
  }

  loading (state) {
    if (!this.root) return
    const method = state ? 'add' : 'remove'
    this.root.classList[method]('tonic--loading')
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  connected () {
    const value = this.props.value

    if (Array.isArray(value)) {
      this.selectOptions(value)
    } else if (value) {
      const option = this.root.querySelector(`option[value="${value}"]`)
      if (option) option.setAttribute('selected', true)
    }
  } */

  styles () {
    const {
      height,
      width,
      padding,
      radius,
      iconArrow
    } = this.props

    return {
      wrapper: {
        width
      },
      select: {
        width,
        height,
        borderRadius: radius,
        padding,
        backgroundImage: `url('${iconArrow}')`
      }
    }
  }

  render () {
    /* const {
      width,
      height,
      disabled,
      required,
      multiple,
      size,
      theme,
      tabindex
    } = this.props

    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''
    const multipleAttr = multiple && multiple === 'true' ? `multiple="true"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''
    const sizeAttr = size ? `size="${size}"` : ''

    if (width) this.root.style.width = width
    if (height) this.root.style.width = height
    if (theme) this.root.classList.add(`tonic--theme--${theme}`)
    if (tabindex) this.root.removeAttribute('tabindex')

    const attributes = [
      disabledAttr,
      multipleAttr,
      sizeAttr,
      required,
      tabAttr
    ].join(' ') */

    return this.html`
      <div class="tonic--wrapper">
        <select>
          ${this.childNodes}
        </select>
      </div>
    `
  }
}

class XPanel extends Tonic {
  render () {
    return this.html`
      <div class="tab">
        ${this.childNodes}
      </div>
    `
  }
}

class XSelect extends Tonic {
  render () {
    return this.html`
      <div class="tonic--wrapper">
        <select>
          ${this.childNodes}
        </select>
      </div>
    `
  }
}

Tonic.add(XPanel)
Tonic.add(XSelect)
Tonic.add(XTronicSelect)

class TonicTabs extends Tonic { /* global Tonic */
  defaults () {
    return {}
  }

  stylesheet () {
    return `
      tonic-tabs .tonic--tab {
        -webkit-appearance: none;
        border: 0;
        border-bottom: 2px solid transparent;
        user-select: none;
      }
      tonic-tabs .tonic--tab[aria-selected="true"] {
        border-bottom: 2px solid var(--tonic-accent);
      }
    `
  }

  click (e) {
    const tab = Tonic.match(e.target, '.tonic--tab')
    if (!tab) return

    e.preventDefault()

    const tabs = this.root.querySelectorAll(`.tonic--tab`)

    tabs.forEach(tab => {
      tab.setAttribute('aria-selected', 'false')

      const control = tab.getAttribute('for')
      const panel = document.querySelector(`tonic-tab-panel[id="${control}"]`)
      panel.setAttribute('hidden', '')
    })

    tab.setAttribute('aria-selected', 'true')

    const id = tab.getAttribute('aria-controls')
    const currentPanel = document.querySelector(`tonic-tab-panel[id="${id}"]`)
    currentPanel.removeAttribute('hidden')
  }

  render () {
    this.root.setAttribute('role', 'tablist')

    return [...this.root.childElements].map(node => {
      const ariaControls = node.getAttribute('for')
      const ariaSelected = node.getAttribute('selected')

      return this.html`
        <a
          ...${node.attributes}
          class="tonic--tab"
          href="#"
          role="tab"
          aria-controls="${ariaControls}"
          aria-selected="${ariaSelected}">
          ${node.innerHTML}
        </a>
      `
    }).join('')
  }
}

Tonic.add(TonicTabs)

class TonicTabPanel extends Tonic { /* global Tonic */
  defaults () {
    return {}
  }

  stylesheet () {
    return `
      tonic-tab-panel {
        display: block;
      }
      tonic-tab-panel[hidden] {
        display: none;
      }
    `
  }

  click (e) {}

  render () {
    const {
      id
    } = this.props

    this.root.setAttribute('role', 'tabpanel')

    const tab = document.querySelector(`.tonic--tab[for="${id}"]`)
    const tabid = tab.getAttribute('id')
    this.root.setAttribute('aria-labelledby', tabid)

    return this.html`
      ${this.childNodes}
    `
  }
}

Tonic.add(TonicTabPanel)
