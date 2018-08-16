class ContentTabs extends Tonic { /* global Tonic */
  defaults () {
    return {}
  }

  style () {
    return `%style%`
  }

  qs (s, p) {
    return (p || document).querySelector(s)
  }

  getCurrentContentNode (group) {
    return this.qs(`[data-tab-group="${group}"].show`)
  }

  click (e) {
    e.preventDefault()
    if (!Tonic.match(e.target, '[data-tab-name]:not([data-tab-group])')) return

    const group = this.props.group
    const currentContentNode = this.getCurrentContentNode(group)
    if (currentContentNode) currentContentNode.classList.remove('show')

    const name = e.target.dataset.tabName
    const target = this.qs(`[data-tab-group="${group}"][data-tab-name="${name}"]`)

    if (!target) {
      console.warn(`Not found '[data-tab-group="${group}"][data-tab-name="${name}"]'`)
      return
    }

    const currentContentLink = this.qs(`[data-tab-name].selected`)
    if (currentContentLink) currentContentLink.classList.remove('selected')

    target.classList.add('show')
    e.target.classList.add('selected')
  }

  connected () {
    const currentLink = this.qs(`[data-tab-name].selected`)
    if (!currentLink) return

    const name = currentLink.dataset.tabName
    const group = this.props.group
    console.log('TABS CONNECTED', name, group)
    if (!group) return

    const target = this.qs(`[data-tab-group="${group}"][data-tab-name="${name}"]`)
    if (!target) return

    target.classList.add('show')
  }

  render () {
    let {
      theme
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

    return this.root.innerHTML
  }
}

Tonic.add(ContentTabs)
