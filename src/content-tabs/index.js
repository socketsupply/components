class ContentTabs extends Tonic { /* global Tonic */
  defaults () {
    return {}
  }

  stylesheet () {
    return `
      [data-tab-group] {
        display: none;
      }

      [data-tab-group] .tonic--show {
        display: block;
      }
    `
  }

  qs (s, p) {
    return (p || document).querySelector(s)
  }

  getCurrentContentNode (group) {
    return this.qs(`[data-tab-group="${group}"].tonic--show`)
  }

  click (e) {
    e.preventDefault()
    if (!Tonic.match(e.target, '[data-tab-name]:not([data-tab-group])')) return

    const group = this.props.group
    const currentContentNode = this.getCurrentContentNode(group)
    if (currentContentNode) currentContentNode.classList.remove('tonic--show')

    const name = e.target.dataset.tabName
    const target = this.qs(`[data-tab-group="${group}"][data-tab-name="${name}"]`)

    if (!target) {
      console.warn(`Not found '[data-tab-group="${group}"][data-tab-name="${name}"]'`)
      return
    }

    const parent = e.target.closest('content-tabs')
    const currentContentLink = this.qs(`[data-tab-name].tonic--selected`, parent)
    if (currentContentLink) currentContentLink.classList.remove('tonic--selected')

    target.classList.add('tonic--show')
    e.target.classList.add('tonic--selected')
  }

  connected () {
    let name = this.root.getAttribute('selected')

    if (name) {
      const targetLink = this.qs(`[data-tab-name=${name}]`, this.root)
      targetLink.classList.add('tonic--selected')
    } else {
      const currentLink = this.qs(`[data-tab-name].tonic--selected`, this.root)
      if (!currentLink) {
        console.warn(`Not found '[data.tab-name].tonic--selected'`)
        return
      }
      name = currentLink.dataset.tabName
    }

    const group = this.props.group
    if (!group) return

    const currentContentNode = this.getCurrentContentNode(group)
    if (currentContentNode) currentContentNode.classList.remove('tonic--show')

    const target = this.qs(`[data-tab-group="${group}"][data-tab-name="${name}"]`)
    if (!target) return

    target.classList.add('tonic--show')
  }

  render () {
    if (this.props.theme) {
      this.root.classList.add(`tonic--theme--${this.props.theme}`)
    }

    return this.root.innerHTML
  }
}

Tonic.add(ContentTabs)
