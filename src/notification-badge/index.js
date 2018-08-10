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

    if (theme) this.root.classList.add(`theme-${theme}`)

    //
    // the id attribute can be removed from the component
    // and added to the input inside the component.
    //
    this.root.removeAttribute('id')

    // if (count > 0) {
    //   const badge = this.root.firstElementChild
    //   badge.classList.add('new')
    // }

    const newAttr = (count > 0) ? 'new' : ''

    return `
      <div class="notifications ${newAttr}">
        <span>${count}</span>
      </div>
    `
  }
}

Tonic.add(NotificationBadge)
