class NotificationBadge extends Tonic { /* global Tonic */
  defaults () {
    return {
      count: 0
    }
  }

  style () {
    return {
      '*': {
        boxSizing: 'border-box'
      },

      '.tonic--notifications': {
        width: '40px',
        height: '40px',
        textAlign: 'center',
        padding: '10px',
        position: 'relative',
        backgroundColor: 'var(--background)',
        borderRadius: '8px'
      },

      '.tonic--notifications .tonic--new span:after': {
        display: 'block'
      },

      'span': {
        color: 'var(--primary)',
        font: '15px var(--subheader)',
        letterSpacing: '1px',
        textAlign: 'center'
      },

      'span:after': {
        content: '',
        width: '8px',
        height: '8px',
        display: 'none',
        position: 'absolute',
        top: '7px',
        right: '6px',
        backgroundColor: 'var(--notification)',
        border: '2px solid var(--background)',
        borderRadius: '50%'
      }
    }
  }

  render () {
    let {
      count,
      theme
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

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
