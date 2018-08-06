class NotificationCenter extends Tonic { /* global Tonic */
  constructor (props) {
    super(props)

    this.root.create = (o) => this.create(o)
    this.root.hide = () => this.hide()
  }

  defaults () {
    return {
      closeIcon: NotificationCenter.svg.closeIcon,
      dangerIcon: NotificationCenter.svg.dangerIcon('#f06653'),
      warningIcon: NotificationCenter.svg.warningIcon('#f9a967'),
      successIcon: NotificationCenter.svg.successIcon('#85b274'),
      infoIcon: NotificationCenter.svg.infoIcon('#999da0'),
      selfClosing: false
    }
  }

  style () {
    return `%style%`
  }

  create ({ message, title, duration, type, selfClosing } = {}) {
    this.show()

    const toaster = document.createElement('div')
    toaster.className = 'toaster'
    const main = document.createElement('main')
    if (type) {
      toaster.classList.add('alert')
    }

    const titleElement = document.createElement('div')
    titleElement.className = 'title'
    titleElement.textContent = title || this.props.title

    const messageElement = document.createElement('div')
    messageElement.className = 'message'
    messageElement.textContent = message || this.props.message

    if (!selfClosing) {
      const close = document.createElement('div')
      close.className = 'close'
      const color = window.getComputedStyle(this.root).getPropertyValue('--primary')
      close.style.backgroundImage = `url("${this.props.closeIcon(color)}")`
      toaster.appendChild(close)
      toaster.classList.add('close')
    }

    if (type) {
      const alertIcon = document.createElement('div')
      alertIcon.className = 'icon'
      toaster.appendChild(alertIcon)

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

    toaster.appendChild(main)
    main.appendChild(titleElement)
    main.appendChild(messageElement)
    this.root.querySelector('.wrapper').appendChild(toaster)
    setImmediate(() => toaster.classList.add('show'))

    if (duration) {
      setTimeout(() => this.destroy(toaster), duration)
    }
  }

  destroy (toaster) {
    toaster.classList.remove('show')
    toaster.addEventListener('transitionend', e => {
      toaster.parentNode.removeChild(toaster)
    })
  }

  show () {
    this.root.firstChild.classList.add('show')
  }

  hide () {
    this.root.firstChild.classList.remove('show')
  }

  click (e) {
    const el = Tonic.match(e.target, '.close')
    if (!el) return

    const toaster = el.closest('.toaster')
    if (toaster) this.destroy(toaster)
  }

  render () {
    const {
      theme
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

    return `
      <div class="wrapper"></div>
    `
  }
}

NotificationCenter.svg = {}

NotificationCenter.svg.closeIcon = (color) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path fill="${color}" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
    </svg>
  `
  return `data:image/svg+xml;base64,${window.btoa(svg)}`
}

NotificationCenter.svg.dangerIcon = (color) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M53.9,76.4h-7.6V68h7.6V76.4z M53.9,60.5h-7.6V25.6h7.6V60.5z"/></svg>`
  return `data:image/svg+xml;base64,${window.btoa(svg)}`
}

NotificationCenter.svg.warningIcon = (color) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="${color}" d="M98.6,86.6l-46-79.7c-1.2-2-4-2-5.2,0l-46,79.7c-1.2,2,0.3,4.5,2.6,4.5h92C98.3,91.1,99.8,88.6,98.6,86.6z M53.9,80.4h-7.6V72h7.6V80.4z M53.9,64.5h-7.6V29.6h7.6V64.5z"/></svg>`
  return `data:image/svg+xml;base64,${window.btoa(svg)}`
}

NotificationCenter.svg.successIcon = (color) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M43.4,71.5L22,50.1l4.8-4.8L43.4,62l28.5-28.5l4.8,4.8L43.4,71.5z"/></svg>`
  return `data:image/svg+xml;base64,${window.btoa(svg)}`
}

NotificationCenter.svg.infoIcon = (color) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M54.1,75.5h-8.1v-7.8h8.1V75.5z M64.1,47.6c-0.8,1.1-2.4,2.7-4.8,4.5L57,54c-1.4,1.1-2.3,2.3-2.7,3.7c-0.3,0.8-0.4,2-0.4,3.6h-8c0.1-3.4,0.5-5.8,1-7.1c0.5-1.3,2-2.9,4.3-4.7l2.4-1.9c0.8-0.6,1.5-1.3,2-2.1c0.9-1.3,1.4-2.8,1.4-4.3c0-1.8-0.5-3.4-1.6-4.9c-1.1-1.5-3-2.3-5.8-2.3c-2.7,0-4.7,0.9-5.9,2.8c-1,1.6-1.6,3.3-1.7,5.1h-8.6c0.4-5.9,2.5-10.1,6.4-12.6l0,0c2.5-1.6,5.7-2.5,9.4-2.5c4.9,0,9,1.2,12.2,3.5c3.2,2.3,4.8,5.7,4.8,10.3C66.2,43.4,65.5,45.7,64.1,47.6z"/></svg>`
  return `data:image/svg+xml;base64,${window.btoa(svg)}`
}

Tonic.add(NotificationCenter)
