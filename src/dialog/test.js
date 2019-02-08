const Tonic = require('@conductorlab/tonic')

class TonicDialog extends Tonic.Dialog {
  click (e) {
    if (!Tonic.match(e.target, '#close')) {
      this.reRender(props => ({
        ...props
      }))
    }
  }

  render () {
    return `
      <header>Dialog</header>
      <main>
        ${this.props.message}
      </main>
      <footer>
        <tonic-button class="tonic--close" id="close">Close</tonic-button>
      </footer>
    `
  }
}

Tonic.add(TonicDialog)

// Default
const link = document.getElementById('dialog-default-button')
const dialog = document.getElementById('dialog-default')

link.addEventListener('click', e => dialog.show())

// ID
const linkID = document.getElementById('dialog-id-button')
const dialogID = document.getElementById('dialog-id')

linkID.addEventListener('click', e => dialogID.show())

// Name
const linkName = document.getElementById('dialog-name-button')
const dialogName = document.getElementById('dialog-name')

linkName.addEventListener('click', e => dialogName.show())

// Width
const linkWidth = document.getElementById('dialog-width-button')
const dialogWidth = document.getElementById('dialog-width')

linkWidth.addEventListener('click', e => dialogWidth.show())

// Full Width
const linkFullWidth = document.getElementById('dialog-full-width-button')
const dialogFullWidth = document.getElementById('dialog-full-width')

linkFullWidth.addEventListener('click', e => dialogFullWidth.show())

// Height
const linkHeight = document.getElementById('dialog-height-button')
const dialogHeight = document.getElementById('dialog-height')

linkHeight.addEventListener('click', e => dialogHeight.show())

// Full Height
const linkFullHeight = document.getElementById('dialog-full-height-button')
const dialogFullHeight = document.getElementById('dialog-full-height')

linkFullHeight.addEventListener('click', e => dialogFullHeight.show())

// Overlay
const linkOverlay = document.getElementById('dialog-overlay-button')
const dialogOverlay = document.getElementById('dialog-overlay')

linkOverlay.addEventListener('click', e => dialogOverlay.show())

// No Overlay
const linkNoOverlay = document.getElementById('dialog-no-overlay-button')
const dialogNoOverlay = document.getElementById('dialog-no-overlay')

linkNoOverlay.addEventListener('click', e => dialogNoOverlay.show())

// Background Color
const linkBackground = document.getElementById('dialog-background-button')
const dialogBackground = document.getElementById('dialog-background')

linkBackground.addEventListener('click', e => dialogBackground.show())

// Theme: Light
const linkLightTheme = document.getElementById('dialog-light-theme-button')
const dialogLightTheme = document.getElementById('dialog-light-theme')

linkLightTheme.addEventListener('click', e => dialogLightTheme.show())

// Theme: Dark
const linkDarkTheme = document.getElementById('dialog-dark-theme-button')
const dialogDarkTheme = document.getElementById('dialog-dark-theme')

linkDarkTheme.addEventListener('click', e => dialogDarkTheme.show())
