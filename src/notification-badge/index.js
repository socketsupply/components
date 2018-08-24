class NotificationBadge extends Tonic { /* global Tonic */
  defaults () {
    return {
      count: 0
    }
  }

  stylesheet () {
    return `
      notification-badge * {
        boxSizing: border-box;
      }

      notification-badge .tonic--notifications {
        width: 40px;
        height: 40px;
        text-align: center;
        padding: 10px;
        position: relative;
        background-color: var(--background);
        border-radius: 8px;
      }

      notification-badge .tonic--notifications .tonic--new span:after {
        display: block;
      }

      notification-badge span {
        color: var(--primary);
        font: 15px var(--subheader);
        letter-spacing: 1px;
        text-align: center;
      }

      notification-badge span:after {
        content: '';
        width: 8px;
        height: 8px;
        display: none;
        position: absolute;
        top: 7px;
        right: 6px;
        background-color: var(--notification);
        border: 2px solid var(--background);
        border-radius: 50%;
      }
    `
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
