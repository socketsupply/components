class TabMenu extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `%style%`

    this.defaults = {
    }
  }

  render () {
    let {
      id
    } = { ...this.defaults, ...this.props }

    return `
      <div class="wrapper>
        <div class="tab-menu">
          <div class="tab"></div>
        </div>
      </div>
    `
  }
}

Tonic.add(TabMenu, { shadow: true })
