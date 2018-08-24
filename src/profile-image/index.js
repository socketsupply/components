class ProfileImage extends Tonic { /* global Tonic */
  defaults () {
    return {
      size: '50px',
      src: ProfileImage.svg.default(),
      iconEdit: ProfileImage.svg.edit(),
      radius: '5px'
    }
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  stylesheet () {
    return `
      profile-image {
        display: inline-block;
      }

      profile-image .tonic--wrapper {
        position: relative;
        overflow: hidden;
      }

      profile-image .tonic--image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }

      profile-image .tonic--overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        transition: opacity 0.2s ease-in-out;
        visibility: hidden;
        opacity: 0;
        display: flex;
      }

      profile-image .tonic--overlay div {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-size: 40px 40px;
        background-repeat: no-repeat;
        background-position: center center;
      }

      profile-image .tonic--wrapper.tonic--editable:hover .tonic--overlay {
        visibility: visible;
        opacity: 1;
        cursor: pointer;
      }
    `
  }

  getPictureData (src, cb) {
    const reader = new window.FileReader()
    reader.onerror = err => cb(err)
    reader.onload = e => cb(null, e.target.result)
    reader.readAsDataURL(src)
  }

  click (e) {
    const fileInput = this.root.getElementsByTagName('input')[0]
    fileInput.click()
  }

  change (e) {
    const fileInput = this.root.getElementsByTagName('input')[0]
    const data = fileInput.files[0]

    this.getPictureData(data, (err, data) => {
      if (err) return this.emit('error', err)

      const slot = this.root.querySelector('.tonic--image')
      slot.style.backgroundImage = 'url("' + data + '")'
      this.emit('changed', data)
    })
  }

  render () {
    let {
      id,
      name,
      size,
      src,
      radius,
      border,
      theme,
      editable
    } = this.props

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    let style = []

    if (size) {
      style.push(`width: ${size}`)
      style.push(`height: ${size}`)
    }

    if (border) style.push(`border: ${border}`)
    if (radius) style.push(`border-radius: ${radius}`)
    style = style.join('; ')

    return `
      <div class="tonic--wrapper ${editable ? 'tonic--editable' : ''}" style="${style}">
        <div
          class="tonic--image"
          ${idAttr}
          ${nameAttr}
          style="background-image: url('${src}');">
        </div>
        <input type="file" style="display:none"/>
        <div class="tonic--overlay">
          <div style="background-image: url('${this.props.iconEdit}')"></div>
        </div>
      </div>
    `
  }
}

ProfileImage.svg = {}
ProfileImage.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`
ProfileImage.svg.default = () => ProfileImage.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect fill="#F0F0F0" width="100" height="100"></rect>
    <circle fill="#D6D6D6" cx="49.3" cy="41.3" r="21.1"></circle>
    <path fill="#D6D6D6" d="M48.6,69.5c-18.1,0-33.1,13.2-36,30.5h72C81.8,82.7,66.7,69.5,48.6,69.5z"></path>
  </svg>
`)

ProfileImage.svg.edit = () => ProfileImage.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="#fff" d="M79.8,32.8L67.5,20.5c-0.2-0.2-0.5-0.2-0.7,0L25.2,62.1c-0.1,0.1-0.1,0.1-0.1,0.2L20.8,79c0,0.2,0,0.4,0.1,0.5c0.1,0.1,0.2,0.1,0.4,0.1c0,0,0.1,0,0.1,0l16.6-4.4c0.1,0,0.2-0.1,0.2-0.1l41.6-41.6C79.9,33.3,79.9,33,79.8,32.8z M67.1,25.8l7.3,7.3L36.9,70.7l-7.3-7.3L67.1,25.8z M33,72.4l-6.8,1.8l1.8-6.9L33,72.4z"/>
  </svg>
`)

Tonic.add(ProfileImage)
