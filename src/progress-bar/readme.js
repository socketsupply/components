let percentage = 0
let interval = null

document.addEventListener('DOMContentLoaded', e => {
  const progressBar = document.getElementById('progress-bar-example')

  interval = setInterval(() => {
    progressBar.setProgress(percentage++)
    if (progressBar.value === 100) percentage = 0
  }, 128)
})
