const Tonic = require('@optoolco/tonic')

const CustomEvent = window.CustomEvent

class TonicTabs extends Tonic {
  static stylesheet () {
    return `
      tonic-tabs .tonic--tab {
        -webkit-appearance: none;
        user-select: none;
      }
    `
  }

  get value () {
    const currentTab = this.querySelector('[aria-selected="true"]')
    if (currentTab) return currentTab.parentNode.id
  }

  set selected (value) {
    const tab = document.getElementById(value)

    if (tab) {
      tab.querySelector('.tonic--tab').click()
    }
  }

  setVisibility (id, forAttr) {
    const tabs = this.querySelectorAll('tonic-tab')

    for (const tab of tabs) {
      const control = tab.getAttribute('for')
      const anchor = tab.querySelector('a')

      if (!control) {
        throw new Error(`No "for" attribute found for tab id "${tab.id}".`)
      }

      const panel = document.getElementById(control)

      if (!panel) {
        throw new Error(`No panel found that matches the id (${control})`)
      }

      if (tab.id === id || control === forAttr) {
        panel.removeAttribute('hidden')
        if (tab.id === id) {
          anchor.setAttribute('aria-selected', 'true')
        } else {
          anchor.setAttribute('aria-selected', 'false')
        }
        this.state.selected = id
        this.dispatchEvent(new CustomEvent(
          'tabvisible', { detail: { id }, bubbles: true }
        ))
      } else {
        panel.setAttribute('hidden', '')
        anchor.setAttribute('aria-selected', 'false')
        this.dispatchEvent(new CustomEvent(
          'tabhidden', { detail: { id }, bubbles: true }
        ))
      }
    }
  }

  click (e) {
    const tab = Tonic.match(e.target, '.tonic--tab')
    if (!tab) return

    e.preventDefault()
    this.setVisibility(tab.parentNode.id, tab.getAttribute('for'))
  }

  keydown (e) {
    const triggers = this.querySelectorAll('.tonic--tab')

    switch (e.code) {
      case 'ArrowLeft':
      case 'ArrowRight': {
        const index = triggers.indexOf(e.target)
        const direction = (e.code === 'ArrowLeft') ? -1 : 1
        const length = triggers.length
        const newIndex = (index + length + direction) % length

        triggers[newIndex].focus()
        e.preventDefault()
        break
      }
      case 'Space': {
        const isActive = Tonic.match(e.target, '.tonic--tab:focus')
        if (!isActive) return

        e.preventDefault()

        const id = isActive.parentNode.getAttribute('id')
        this.setVisibility(id)
        break
      }
    }
  }

  connected () {
    const id = this.state.selected || this.props.selected
    setImmediate(() => this.setVisibility(id))
  }

  render () {
    this.setAttribute('role', 'tablist')

    return this.html`${this.childNodes}`
  }
}

class TonicTabPanel extends Tonic {
  static stylesheet () {
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
    this.setAttribute('aria-labelledby', tabid)
  }

  render () {
    this.setAttribute('role', 'tabpanel')

    return this.html`
      ${this.childNodes}
    `
  }
}

class TonicTab extends Tonic {
  render () {
    const ariaControls = this.props.for

    return this.html`
      <a
        id="${this.id}-anchor"
        for="${this.props.for}"
        class="tonic--tab"
        href="#"
        role="tab"
        aria-controls="${ariaControls}"
        aria-selected="false"
      >
        ${this.childNodes}
      </a>
    `
  }
}

module.exports = {
  TonicTabs,
  TonicTab,
  TonicTabPanel
}
