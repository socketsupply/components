class TabMenu extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `%style%`

    this.defaults = {
    }
  }

  render () {
    let {
      theme
    } = { ...this.defaults, ...this.props }

    if (theme) this.classList.add(`theme-${theme}`)

    return `
      <div class="tab-menu">
        <div class="tab"></div>
      </div>
    `
  }
}

Tonic.add(TabMenu, { shadow: true })
