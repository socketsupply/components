const Tonic = require('@conductorlab/tonic')

class TonicPanel extends Tonic.Panel {
  async click (e) {
    if (e.target.value === 'close') {
      return this.hide()
    }
  }

  render () {
    return `
      <header></header>
      <main>
        <h3>${this.props.title || 'Hello'}
      </main>
      <footer>
        <tonic-button value="close">Close</tonic-button>
      </footer>
    `
  }
}

Tonic.add(TonicPanel)
Tonic.init()
//
// Panel Default
//
const panelDefaultButton = document.getElementById('tonic-panel-default-button')
const panelDefault = document.getElementById('tonic-panel-default')

panelDefaultButton.addEventListener('click', e => panelDefault.show())

//
// Panel Name
//
const panelNameButton = document.getElementById('tonic-panel-name-button')
const panelName = document.getElementById('tonic-panel-name')

panelNameButton.addEventListener('click', e => panelName.show())

//
// Panel Overlay
//
const panelOverlayButton = document.getElementById('tonic-panel-overlay-button')
const panelOverlay = document.getElementById('tonic-panel-overlay')

panelOverlayButton.addEventListener('click', e => panelOverlay.show())

//
// Panel w/ Position Right
//
const panelPositionRightButton = document.getElementById('tonic-panel-position-right-button')
const panelPositionRight = document.getElementById('tonic-panel-position-right')

panelPositionRightButton.addEventListener('click', e => panelPositionRight.show())

//
// Panel w/ Position Left
//
const panelPositionButton = document.getElementById('tonic-panel-position-button')
const panelPosition = document.getElementById('tonic-panel-position')

panelPositionButton.addEventListener('click', e => panelPosition.show())

//
// Panel w/ Background Color
//
const panelBackgroundButton = document.getElementById('tonic-panel-background-button')
const panelBackground = document.getElementById('tonic-panel-background')

panelBackgroundButton.addEventListener('click', e => panelBackground.show())

//
// Panel w/ Theme Light
//
const panelThemeLightButton = document.getElementById('tonic-panel-theme-button')
const panelThemeLight = document.getElementById('tonic-panel-theme')

panelThemeLightButton.addEventListener('click', e => panelThemeLight.show())

//
// Panel w/ Theme Dark
//
const panelThemeDarkButton = document.getElementById('tonic-panel-theme-dark-button')
const panelThemeDark = document.getElementById('tonic-panel-theme-dark')

panelThemeDarkButton.addEventListener('click', e => panelThemeDark.show())
