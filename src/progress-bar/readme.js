document.addEventListener('DOMContentLoaded', e => {
  const progressBar = document.getElementById('progress-bar-example')
  let n = 0

  let timer = setInterval(() => {
    progressBar.setProgress(n + 1)
    if (n === 100) clearInterval(timer)
  }, 2048)
})
