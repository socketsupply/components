class TabMenu extends Tonic { /* global Tonic */
  constructor (props) {
    super(props)

    this.defaults = {
    }
  }

  style () {
    return `%style%`
  }

  render () {
    let {
      theme
    } = { ...this.defaults, ...this.props }

    if (theme) this.root.classList.add(`theme-${theme}`)

    return `
      <div class="tab-menu">
        <div class="tab"></div>
      </div>
    `
  }
}

Tonic.add(TabMenu)
