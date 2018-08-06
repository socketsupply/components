class NotificationToaster extends Tonic { /* global Tonic */
  defaults () {
    return {}
  }

  style () {
    return `%style%`
  }

  render () {
    const {
      theme
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)
    return `<div></div>`
  }
}

Tonic.add(NotificationToaster)
