const tape = require('tape')

module.exports = id => {
  const stream = tape.createStream({ objectMode: true })

  let count = 0
  let passed = 0

  const section = document.getElementById(id)
  const aside = section.querySelector('aside')

  const inc = id => {
    const el = document.getElementById(id)
    const count = el.querySelector('.value')

    return () => {
      const val = count.textContent.trim()
      count.textContent = parseInt(val, 10) + 1
    }
  }

  const incPassing = inc('passing')
  const incTotal = inc('total')

  stream.on('data', data => {
    if (typeof data === 'string') {
      aside.innerHTML += `<span class="comment">#${data}</span>`
    }

    if (data.type === 'test') {
      aside.innerHTML += `<span class="title"># ${data.name}</span>`
      return
    }

    if (data.type === 'assert') {
      ++count
      incTotal()

      let status = data.ok ? 'OK' : 'FAIL'
      aside.innerHTML += `<span class="result ${status}">${status} ${data.id} ${data.name}</span>`

      if (!data.ok) {
        console.error(data)
        return
      }

      ++passed
      incPassing()
      return
    }

    if (data.type === 'end') {
      aside.innerHTML += `\n1..${count}\n# tests ${count}\n# passed ${passed}`

      const ok = passed === count ? 'OK' : 'FAIL'

      const status = document.getElementById('status')
      const value = status.querySelector('.value')

      if (!status.classList.contains('fail')) {
        value.textContent = ok
      }

      if (!ok) {
        status.classList.add('fail')
      }

      aside.innerHTML += `<span class="${ok}"># ${ok ? 'ok' : 'not ok'}</span>`
    }
  })

  return tape
}
