const Tonic = require('@optoolco/tonic')
const { Panel } = require('./index')

class ExamplePanel extends Panel {
  async click (e) {
    if (e.target.value === 'close') {
      return this.hide()
    }
  }

  render () {
    return `
      <div class="tonic--header">Panel Example</div>
      <div class="tonic--main">
        <h3>${this.props.title || 'Hello'}
      </div>
      <div class="tonic--footer">
        <tonic-button value="close">Close</tonic-button>
      </div>
    `
  }
}

Tonic.add(ExamplePanel)

//
// Panel Default
//
const panelDefaultButton = document.getElementById('example-panel-default-button')
const panelDefault = document.getElementById('example-panel-default')

panelDefaultButton.addEventListener('click', e => panelDefault.show())

//
// Panel Name
//
const panelNameButton = document.getElementById('example-panel-name-button')
const panelName = document.getElementById('example-panel-name')

panelNameButton.addEventListener('click', e => panelName.show())

//
// Panel Overlay
//
const panelOverlayButton = document.getElementById('example-panel-overlay-button')
const panelOverlay = document.getElementById('example-panel-overlay')

panelOverlayButton.addEventListener('click', e => panelOverlay.show())

//
// Panel w/ Position Right
//
const panelPositionRightButton = document.getElementById('example-panel-position-right-button')
const panelPositionRight = document.getElementById('example-panel-position-right')

panelPositionRightButton.addEventListener('click', e => panelPositionRight.show())

//
// Panel w/ Position Left
//
const panelPositionButton = document.getElementById('example-panel-position-button')
const panelPosition = document.getElementById('example-panel-position')

panelPositionButton.addEventListener('click', e => panelPosition.show())

//
// Panel w/ Background Color
//
const panelBackgroundButton = document.getElementById('example-panel-background-button')
const panelBackground = document.getElementById('example-panel-background')

panelBackgroundButton.addEventListener('click', e => panelBackground.show())

//
// Panel w/ Theme Light
//
const panelThemeLightButton = document.getElementById('example-panel-theme-button')
const panelThemeLight = document.getElementById('example-panel-theme')

panelThemeLightButton.addEventListener('click', e => panelThemeLight.show())

//
// Panel w/ Theme Dark
//
const panelThemeDarkButton = document.getElementById('example-panel-theme-dark-button')
const panelThemeDark = document.getElementById('example-panel-theme-dark')

panelThemeDarkButton.addEventListener('click', e => panelThemeDark.show())
