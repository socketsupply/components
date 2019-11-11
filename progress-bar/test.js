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
