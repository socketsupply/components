class TonicTabs extends Tonic { /* global Tonic */
  defaults () {
    return {}
  }

  stylesheet () {
    return `
      [data-tab-name] {
        color: var(--primary);
      }

      [data-tab-group][hidden="true"] {
        display: none;
      }

      [data-tab-group] {
        display: block;
      }
    `
  }

  qs (s, p) {
    return (p || document).querySelector(s)
  }

  qsa (s, p) {
    return [...(p || document).querySelectorAll(s)]
  }

  getCurrentContentNode (group) {
    return this.qs(`[data-tab-group="${group}"].tonic--show`)
  }

  click (e) {
    const tab = Tonic.match(e.target, '[data-tab-name]:not([data-tab-group])')
    if (!tab) return

    e.preventDefault()

    const group = this.props.group

    const currentPanel = this.getCurrentContentNode(group)

    if (currentPanel) {
      currentPanel.classList.remove('tonic--show')
      currentPanel.setAttribute('hidden', true) // NOTE: accessibility
    }

    const name = tab.dataset.tabName
    const target = this.qs(`[data-tab-group="${group}"][data-tab-name="${name}"]`)

    if (target) {
      target.classList.add('tonic--show')
      target.removeAttribute('hidden') // NOTE: accessibility
    } else {
      console.warn(`Not found '[data-tab-group="${group}"][data-tab-name="${name}"]'`)
    }

    const parent = tab.closest('tonic-tabs')
    const currentTab = this.qs(`[data-tab-name].tonic--selected`, parent)

    if (currentTab) {
      currentTab.classList.remove('tonic--selected')
      currentTab.setAttribute('aria-selected', false) // NOTE: accessibility
    }

    tab.classList.add('tonic--selected')
    tab.setAttribute('aria-selected', true) // NOTE: accessibility

    this.setState(state => Object.assign(state, {
      selected: name
    }))
  }

  connected () {
    let name = this.state.selected || this.root.getAttribute('selected')

    if (name) {
      const targetTab = this.qs(`[data-tab-name=${name}]`, this.root)
      if (targetTab) {
        targetTab.classList.add('tonic--selected')
        targetTab.setAttribute('aria-selected', true) // NOTE: accessibility
      }
    } else {
      const currentTab = this.qs(`[data-tab-name].tonic--selected`, this.root)
      if (!currentTab) return console.warn(`Not found '[data.tab-name].tonic--selected'`)

      name = currentTab.dataset.tabName
    }

    const group = this.props.group
    if (!group) return

    const currentPanel = this.getCurrentContentNode(group)
    if (currentPanel) currentPanel.classList.remove('tonic--show')

    const target = this.qs(`[data-tab-group="${group}"][data-tab-name="${name}"]`)
    if (!target) return

    target.classList.add('tonic--show')

    //
    // NOTE: accessibility
    //
    const sections = this.qsa(`[data-tab-group="${group}"]`)

    sections.forEach(section => {
      const tabName = section.getAttribute('data-tab-name')
      section.setAttribute('role', 'tabpanel')
      section.setAttribute('aria-labelledby', `tab--${tabName}`)

      const isShowing = section.classList.contains('tonic--show')
      if (isShowing === false) section.setAttribute('hidden', true)
    })
  }

  render () {
    const {
      tabindex,
      label
    } = this.props

    //
    // NOTE: accessibility
    //
    if (tabindex) this.root.removeAttribute('tabindex')
    const tabIndex = tabindex || '0'

    if (label) this.root.setAttribute('aria-label', label)

    this.root.setAttribute('role', 'tablist')

    this.qsa('[data-tab-name]', this.root).forEach(tab => {
      const dataTabName = tab.getAttribute('data-tab-name')
      tab.setAttribute('tabindex', tabIndex)
      tab.setAttribute('role', 'tab')
      tab.setAttribute('aria-selected', false)
      tab.setAttribute('id', `tab--${dataTabName}`)
    })

    // Theme
    if (this.props.theme) {
      this.root.classList.add(`tonic--theme--${this.props.theme}`)
    }

    return this.root.innerHTML
  }
}

Tonic.add(TonicTabs)
