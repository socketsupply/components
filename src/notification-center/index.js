class NotificationCenter extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    this.root.create = (o) => this.create(o)
    this.root.hide = () => this.hide()
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  defaults () {
    return {
      closeIcon: NotificationCenter.svg.closeIcon(this.getPropertyValue('primary')),
      dangerIcon: NotificationCenter.svg.dangerIcon(this.getPropertyValue('danger')),
      warningIcon: NotificationCenter.svg.warningIcon(this.getPropertyValue('warning')),
      successIcon: NotificationCenter.svg.successIcon(this.getPropertyValue('success')),
      infoIcon: NotificationCenter.svg.infoIcon(this.getPropertyValue('info')),
      position: 'center'
    }
  }

<<<<<<< HEAD
  style () {
    return {
      '*': {
        boxSizing: 'border-box'
      },
      '.tonic--wrapper': {
        userSelect: 'none',
        position: 'fixed',
        top: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        visibility: 'hidden',
        zIndex: '102'
      },
      // '.tonic--wrapper @media (max-width: 850px)': {
      //   width: '90%'
      // },
      '.tonic--wrapper.tonic--show': {
        visibility: 'visible'
      },
      '.tonic--wrapper.tonic--center': {
        left: '50%',
        alignItems: 'center',
        '-webkit-transform': 'translateX(-50%)',
        '-ms-transform': 'translateX(-50%)',
        transform: 'translateX(-50%)'
      },
      '.tonic--wrapper.tonic--left': {
        alignItems: 'flex-start',
        left: '10px'
      },
      '.tonic--wrapper.tonic--right': {
        alignItems: 'flex-end',
        right: '10px'
      },
      '.tonic--notification': {
        width: 'auto',
        maxWidth: '600px',
        marginTop: '10px',
        position: 'relative',
        backgroundColor: 'var(--window)',
        boxShadow: '0px 10px 40px -20px rgba(0,0,0,0.4), 0 0 1px #a2a9b1',
        borderRadius: '3px',
        '-webkit-transform': 'translateY(-100px)',
        '-ms-transform': 'translateY(-100px)',
        transform: 'translateY(-100px)',
        transition: 'opacity 0.2s ease, transform 0s ease 1s',
        zIndex: '1',
        opacity: '0'
      },
      '.tonic--notification.tonic--show': {
        opacity: '1',
        '-webkit-transform': 'translateY(0)',
        '-ms-transform': 'translateY(0)',
        transform: 'translateY(0)',
        transition: 'transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
      },
      '.tonic--notification.tonic--close': {
        paddingRight: '50px'
      },
      '.tonic--notification.tonic--alert': {
        paddingLeft: '35px'
      },
      '.tonic--main': {
        padding: '17px 15px 15px 15px'
      },
      '.tonic--title': {
        font: '14px/18px var(--subheader)'
      },
      '.tonic--message': {
        font: '14px/18px var(--subheader)',
        color: 'var(--medium)'
      },
      '.tonic--icon': {
        width: '16px',
        height: '16px',
        position: 'absolute',
        left: '20px',
        top: '50%',
        backgroundSize: 'cover',
        '-webkit-transform': 'translateY(-50%)',
        '-ms-transform': 'translateY(-50%)',
        transform: 'translateY(-50%)'
      },
      '.tonic--close': {
        width: '20px',
        height: '20px',
        position: 'absolute',
        right: '20px',
        top: '50%',
        '-webkit-transform': 'translateY(-50%)',
        '-ms-transform': 'translateY(-50%)',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        backgroundSize: 'cover'
      },
      '.tonic--close svg path': {
        fill: 'var(--primary)',
        color: 'var(--primary)'
      }
    }
=======
  stylesheet () {
    return `
      notification-center * {
        box-sizing: border-box;
      }

      notification-center .tonic--wrapper {
        user-select: none;
        position: fixed;
        top: 10px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        visibility: hidden;
        z-index: 102;
      }

      @media (max-width: 850px) notification-center .tonic--wrapper {
        width: 90%;
      }

      notification-center .tonic--wrapper.tonic--show {
        visibility: visible;
      }

      notification-center .tonic--wrapper.tonic--center {
        left: 50%;
        align-items: center;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
      }

      notification-center .tonic--wrapper.tonic--left {
        align-items: flex-start;
        left: 10px;
      }

      notification-center .tonic--wrapper.tonic--right {
        align-items: flex-end;
        right: 10px;
      }

      notification-center .tonic--notification {
        width: auto;
        max-width: 600px;
        margin-top: 10px;
        position: relative;
        background-color: var(--window);
        box-shadow: 0px 10px 40px -20px rgba(0,0,0,0.4), 0 0 1px #a2a9b1;
        border-radius: 3px;
        -webkit-transform: translateY(-100px);
        -ms-transform: translateY(-100px);
        transform: translateY(-100px);
        transition: opacity 0.2s ease, transform 0s ease 1s;
        z-index: 1;
        opacity: 0;
      }

      notification-center .tonic--notification.tonic--show {
        opacity: 1;
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0);
        transition: transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
      }

      notification-center .tonic--notification.tonic--close {
        padding-right: 50px;
      }

      notification-center .tonic--notification.tonic--alert {
        padding-left: 35px;
      }

      notification-center .tonic--main {
        padding: 17px 15px 15px 15px;
      }

      notification-center .tonic--title {
        font: 14px/18px var(--subheader);
      }

      notification-center .tonic--message {
        font: 14px/18px var(--subheader);
        color: var(--medium);
      }

      notification-center .tonic--notification .tonic--icon {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 20px;
        top: 50%;
        background-size: cover;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      notification-center .tonic--notification .tonic--close {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 20px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        cursor: pointer;
        background-size: cover;
      }

      notification-center .tonic--notification .tonic--close svg path {
        fill: var(--primary);
        color: var(--primary);
      }
    `
>>>>>>> refacor-styles
  }

  create ({ message, title, duration, type, dismiss } = {}) {
    const notification = document.createElement('div')
    notification.className = 'tonic--notification'
    const main = document.createElement('div')
    main.className = 'tonic--main'
    if (type) {
      notification.classList.add('tonic--alert')
    }

    const titleElement = document.createElement('div')
    titleElement.className = 'tonic--title'
    titleElement.textContent = title || this.props.title

    const messageElement = document.createElement('div')
    messageElement.className = 'tonic--message'
    messageElement.textContent = message || this.props.message

    if (dismiss !== 'false') {
      const close = document.createElement('div')
      close.className = 'tonic--close'
      close.style.backgroundImage = `url("${this.props.closeIcon}")`
      notification.appendChild(close)
      notification.classList.add('tonic--close')
    }

    if (type) {
      const alertIcon = document.createElement('div')
      alertIcon.className = 'tonic--icon'
      notification.appendChild(alertIcon)

      switch (type) {
        case 'danger':
          alertIcon.style.backgroundImage = `url("${this.props.dangerIcon}")`
          if (!title && !message) { titleElement.textContent = 'Danger' }
          break

        case 'warning':
          alertIcon.style.backgroundImage = `url("${this.props.warningIcon}")`
          if (!title && !message) { titleElement.textContent = 'Warning' }
          break

        case 'success':
          alertIcon.style.backgroundImage = `url("${this.props.successIcon}")`
          if (!title && !message) { titleElement.textContent = 'Success' }
          break

        case 'info':
          alertIcon.style.backgroundImage = `url("${this.props.infoIcon}")`
          if (!title && !message) { titleElement.textContent = 'Information' }
          break
      }
    }

    notification.appendChild(main)
    main.appendChild(titleElement)
    main.appendChild(messageElement)
    this.root.querySelector('.tonic--wrapper').appendChild(notification)
    this.show()

    setTimeout(() => {
      notification.classList.add('tonic--show')
    }, 64)

    if (duration) {
      setTimeout(() => this.destroy(notification), duration)
    }
  }

  destroy (notification) {
    notification.classList.remove('tonic--show')
    notification.addEventListener('transitionend', e => {
      notification.parentNode.removeChild(notification)
    })
  }

  show () {
    const node = this.root.firstElementChild
    node.classList.add('tonic--show')
  }

  hide () {
    const node = this.root.firstElementChild
    node.classList.remove('tonic--show')
  }

  click (e) {
    const el = Tonic.match(e.target, '.tonic--close')
    if (!el) return

    const notification = el.closest('.tonic--notification')
    if (notification) this.destroy(notification)
  }

  render () {
    const {
      theme,
      position
    } = this.props

    const positionAttr = position ? `tonic--${position}` : ''

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    return `<div class="tonic--wrapper ${positionAttr}"></div>`
  }
}

NotificationCenter.svg = {}
NotificationCenter.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`

NotificationCenter.svg.closeIcon = color => NotificationCenter.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
  </svg>
`)

NotificationCenter.svg.dangerIcon = color => NotificationCenter.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M53.9,76.4h-7.6V68h7.6V76.4z M53.9,60.5h-7.6V25.6h7.6V60.5z"/>
  </svg>
`)

NotificationCenter.svg.warningIcon = color => NotificationCenter.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M98.6,86.6l-46-79.7c-1.2-2-4-2-5.2,0l-46,79.7c-1.2,2,0.3,4.5,2.6,4.5h92C98.3,91.1,99.8,88.6,98.6,86.6z M53.9,80.4h-7.6V72h7.6V80.4z M53.9,64.5h-7.6V29.6h7.6V64.5z"/>
  </svg>
`)

NotificationCenter.svg.successIcon = color => NotificationCenter.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M43.4,71.5L22,50.1l4.8-4.8L43.4,62l28.5-28.5l4.8,4.8L43.4,71.5z"/>
  </svg>
`)

NotificationCenter.svg.infoIcon = color => NotificationCenter.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M54.1,75.5h-8.1v-7.8h8.1V75.5z M64.1,47.6c-0.8,1.1-2.4,2.7-4.8,4.5L57,54c-1.4,1.1-2.3,2.3-2.7,3.7c-0.3,0.8-0.4,2-0.4,3.6h-8c0.1-3.4,0.5-5.8,1-7.1c0.5-1.3,2-2.9,4.3-4.7l2.4-1.9c0.8-0.6,1.5-1.3,2-2.1c0.9-1.3,1.4-2.8,1.4-4.3c0-1.8-0.5-3.4-1.6-4.9c-1.1-1.5-3-2.3-5.8-2.3c-2.7,0-4.7,0.9-5.9,2.8c-1,1.6-1.6,3.3-1.7,5.1h-8.6c0.4-5.9,2.5-10.1,6.4-12.6l0,0c2.5-1.6,5.7-2.5,9.4-2.5c4.9,0,9,1.2,12.2,3.5c3.2,2.3,4.8,5.7,4.8,10.3C66.2,43.4,65.5,45.7,64.1,47.6z"/>
  </svg>
`)

Tonic.add(NotificationCenter)
