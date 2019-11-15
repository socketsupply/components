const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="progress-bar">
  <h2>Progress Bar</h2>

  <!-- Progress Bar Default -->
  <div class="test-container">
    <span>Default Progress Bar</span>
    <tonic-progress-bar
      id="progress-bar-default">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Auto -->
  <div class="test-container">
    <span>Progress Bar (automatic with js)</span>
    <tonic-progress-bar
      id="progress-bar-auto">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Default -->
  <div class="test-container">
    <span>Progress Bar - 30%</span>
    <tonic-progress-bar
      id="progress-bar-30">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Width px -->
  <div class="test-container">
    <span>width="150px"</span>
    <tonic-progress-bar
      id="progress-bar-width"
      width="150px">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Width % -->
  <div class="test-container">
    <span>width="100%"</span>
    <tonic-progress-bar
      id="progress-bar-width-100"
      width="100%">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Height -->
  <div class="test-container">
    <span>height="40px"</span>
    <tonic-progress-bar
      id="progress-bar-height"
      height="40px">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Color -->
  <div class="test-container">
    <span>color="purple"</span>
    <tonic-progress-bar
      id="progress-bar-color"
      color="purple">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Theme Light -->
  <div class="test-container">
    <span>theme="light"</span>
    <tonic-progress-bar
      id="progress-bar-theme-light"
      theme="light">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Theme Dark -->
  <div class="test-container flex-half dark">
    <span>theme="dark"</span>
    <tonic-progress-bar
      id="progress-bar-theme-dark"
      theme="dark">
    </tonic-progress-bar>
  </div>

</section>
`)

const progressBar30 = document.getElementById('progress-bar-30')
progressBar30.setProgress(30)

const progressBarWidth = document.getElementById('progress-bar-width')
progressBarWidth.value = 75

const progressBarWidth100 = document.getElementById('progress-bar-width-100')
progressBarWidth100.value = 50

const progressBarHeight = document.getElementById('progress-bar-height')
progressBarHeight.value = 25

const progressBarColor = document.getElementById('progress-bar-color')
progressBarColor.value = 40

const progressBarThemeLight = document.getElementById('progress-bar-theme-light')
progressBarThemeLight.value = 60

const progressBarThemeDark = document.getElementById('progress-bar-theme-dark')
progressBarThemeDark.value = 60

let percentage = 0
let reps = 0
let interval = null

const progressBarAuto = document.getElementById('progress-bar-auto')

clearInterval(interval)
interval = setInterval(() => {
  progressBarAuto.setProgress(percentage++)
  if (progressBarAuto.value >= 100) percentage = 0
  if (++reps === 2) clearInterval(interval)
}, 128)

// TODO: convert to tape tests.
