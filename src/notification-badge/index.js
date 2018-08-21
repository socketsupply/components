class NotificationBadge extends Tonic { /* global Tonic */
  defaults () {
    return {
      count: 0
    }
  }

  style () {
    return `%style%`
  }

  render () {
    let {
      count,
      theme
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    //
    // the id attribute can be removed from the component
    // and added to the input inside the component.
    //
    this.root.removeAttribute('id')

    const countAttr = (count > 99) ? '99' : count

    const newAttr = (count > 0) ? 'tonic--new' : ''

    return `
      <div class="tonic--notifications ${newAttr}">
        <span>${countAttr}</span>
      </div>
    `
  }
}

Tonic.add(NotificationBadge)
