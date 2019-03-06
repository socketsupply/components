class TonicTabs extends Tonic { /* global Tonic */
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

  get value () {
    const currentTab = this.root.querySelector('[aria-selected="true"]')
    if (currentTab) return currentTab.id
  }

  set selected (value) {
    const tab = this.root.getElementById(value)
    if (tab) tab.click()
  }

  setVisibility (id) {
    const tabs = this.root.querySelectorAll(`.tonic--tab`)

    for (const tab of tabs) {
      const control = tab.getAttribute('for')
      if (!control) return

      const panel = document.getElementById(control)
      if (!panel) return

      if (tab.id === id) {
        panel.removeAttribute('hidden')
        tab.setAttribute('aria-selected', 'true')
        this.state.selected = id
      } else {
        panel.setAttribute('hidden', '')
        tab.setAttribute('aria-selected', 'false')
      }
    }
  }

  click (e) {
    const tab = Tonic.match(e.target, '.tonic--tab')
    if (!tab) return
    this.setVisibility(tab.id)
  }

  connected () {
    const id = this.state.selected || this.props.selected
    setImmediate(() => this.setVisibility(id))
  }

  render () {
    this.root.setAttribute('role', 'tablist')

    return [...this.root.childElements].map((node, index) => {
      const ariaControls = node.getAttribute('for')

      return this.html`
        <a
          ...${node.attributes}
          class="tonic--tab"
          href="#"
          role="tab"
          aria-controls="${ariaControls}"
          aria-selected="false">
          ${node.childNodes}
        </a>
      `
    }).join('')
  }
}

Tonic.add(TonicTabs)

class TonicTabPanel extends Tonic { /* global Tonic */
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
