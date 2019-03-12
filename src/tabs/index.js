class TonicTabs extends Tonic { /* global Tonic */
  stylesheet () {
    return `
      tonic-tabs .tonic--tab {
        -webkit-appearance: none;
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

  qsa (s) {
    return [...this.root.querySelectorAll(s)]
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

    e.preventDefault()
    this.setVisibility(tab.id)
  }

  keydown (e) {
    const triggers = this.qsa('.tonic--tab')

    switch (e.code) {
      case 'ArrowLeft':
      case 'ArrowRight':
        const index = triggers.indexOf(e.target)
        const direction = (e.code === 'ArrowLeft') ? -1 : 1
        const length = triggers.length
        const newIndex = (index + length + direction) % length

        triggers[newIndex].focus()
        e.preventDefault()
        break

      case 'Space':
        const isActive = Tonic.match(e.target, '.tonic--tab:focus')
        if (!isActive) return

        e.preventDefault()

        const id = isActive.getAttribute('id')
        this.setVisibility(id)
        break
    }
  }

  connected () {
    const id = this.state.selected || this.props.selected
    setImmediate(() => this.setVisibility(id))
  }

  render () {
    this.root.setAttribute('role', 'tablist')

    return [...this.root.childElements].map((node, index) => {
      const ariaControls = node.getAttribute('for')

      if (node.attributes.class) {
        node.attributes.class.value += ' tonic--tab'
      }

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

  connected () {
    const tab = document.querySelector(`.tonic--tab[for="${this.props.id}"]`)
    if (!tab) return
    const tabid = tab.getAttribute('id')
    this.root.setAttribute('aria-labelledby', tabid)
  }

  render () {
    this.root.setAttribute('role', 'tabpanel')

    return this.html`
      ${this.childNodes}
    `
  }
}

Tonic.add(TonicTabPanel)
