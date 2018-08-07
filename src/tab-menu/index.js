class ContentTabs extends Tonic { /* global Tonic */
  defaults () {
    return {}
  }

  style () {
    return `%style%`
  }

  render () {
    let {
      theme
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

    const nodes = [...this.root.querySelectorAll('[data-tab-name]')]
    console.log(nodes)

    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.root.innerHTML

    return wrapper
  }
}

Tonic.add(ContentTabs)
