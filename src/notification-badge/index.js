class NotificationBadge extends Tonic { /* global Tonic */
  defaults () {
    return {}
  }

  style () {
    return `%style%`
  }

  render () {
    let {
      count,
      theme
    } = { ...this.defaults, ...this.props }

    if (theme) this.root.classList.add(`theme-${theme}`)

    count = '23'

    return `
      <div class="notifications">
        <span>${count}</span>
      </div>
    `
  }
}

Tonic.add(NotificationBadge)
