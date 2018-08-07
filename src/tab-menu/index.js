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

  click (e) {
    e.preventDefault()
    if (!Tonic.match(e.target, '[data-tab-name]:not([data-tab-group])')) return

    const group = this.props.group
    const currentContent = this.qs(`[data-tab-group="${group}"].show`)
    if (currentContent) currentContent.classList.remove('show')

    const name = e.target.dataset.tabName
    const target = this.qs(`[data-tab-group="${group}"][data-tab-name="${name}"]`)

    if (!target) {
      console.warn(`Not found '[data-tab-group="${group}"][data-tab-name="${name}"]'`)
      return
    }

    const currentLink = this.qs(`[data-tab-name].selected`)
    if (currentLink) currentLink.classList.remove('selected')

    target.classList.add('show')
    e.target.classList.add('selected')
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
