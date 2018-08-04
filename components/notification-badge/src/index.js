const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class NotificationBadge extends Tonic {
  constructor () {
    super()
    this.stylesheet = `%style%`

    this.defaults = {
    }
  }

  render () {
    let {
      count
    } = { ...this.defaults, ...this.props }

    count = '23'

    return `
      <div class="notifications">
        <span>${count}</span>
      </div>
    `
  }
}

Tonic.add(NotificationBadge, { shadow: true })
