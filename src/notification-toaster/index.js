class NotificationToaster extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `%style%`

    this.defaults = {
    }
  }

  render () {
    return `<div></div>`
  }
}

Tonic.add(NotificationToaster)
