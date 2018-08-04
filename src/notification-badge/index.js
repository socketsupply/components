class NotificationBadge extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `%style%`

    this.defaults = {
    }
  }

  render () {
    let {
      count,
      theme
    } = { ...this.defaults, ...this.props }

    if (theme) this.classList.add(`theme-${theme}`)

    count = '23'

    return `
      <div class="notifications">
        <span>${count}</span>
      </div>
    `
  }
}

Tonic.add(NotificationBadge, { shadow: true })
