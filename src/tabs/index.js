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
