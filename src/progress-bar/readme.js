let percentage = 0
let interval = null

const progressBar = document.getElementById('progress-bar-example')

document.getElementById('start-progress').addEventListener('click', e => {
  interval = setInterval(() => {
    progressBar.setProgress(percentage++)
    if (progressBar.value >= 100) percentage = 0
  }, 128)
})

document.getElementById('stop-progress').addEventListener('click', e => {
  clearInterval(interval)
})
