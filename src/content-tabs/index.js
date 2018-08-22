class ContentTabs extends Tonic { /* global Tonic */
  defaults () {
    return {}
  }

  style () {
    return {
      'content-tabs': {
        display: 'block'
      },

      '[data-tab-name]:not([data-tab-group])': {
        userSelect: 'none',
        fontFamily: 'var(--subheader)',
        fontSize: '14px',
        borderBottom: '1px solid transparent',
        marginRight: '8px'
      },

      '.tonic--selected': {
        color: 'var(--accent)',
        borderBottom: '1px solid var(--accent)'
      },

      '[data-tab-group]': {
        marginTop: '15px',
        display: 'none',
        borderTop: '1px solid var(--border)',
        paddingTop: '15px'
      },

      '.tonic--show': {
        display: 'block'
      }
    }
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

    const currentContentLink = this.qs(`[data-tab-name].tonic--selected`)
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
    let {
      theme
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    return this.root.innerHTML
  }
}

Tonic.add(ContentTabs)
