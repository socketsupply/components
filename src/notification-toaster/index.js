class NotificationToaster extends Tonic { /* global Tonic */
  constructor (props) {
    super(props)

    this.defaults = {
    }
  }

  style () {
    return `%style%`
  }

  render () {
    const {
      theme
    } = { ...this.defaults, ...this.props }

    if (theme) this.root.classList.add(`theme-${theme}`)
    return `<div></div>`
  }
}

Tonic.add(NotificationToaster)
