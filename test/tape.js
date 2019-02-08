const tape = require('tape')

module.exports = id => {
  const stream = tape.createStream({ objectMode: true })

  let count = 0
  let passed = 0

  stream.on('data', data => {
    const section = document.getElementById(id)
    const aside = section.querySelector('aside')

    if (typeof data === 'string') {
      aside.innerHTML += `<span class="comment">#${data}</span>`
    }

    if (data.type === 'test') {
      aside.innerHTML += `<span class="title"># ${data.name}</span>`
      return
    }

    if (data.type === 'assert') {
      ++count
      let status = data.ok ? 'OK' : 'FAIL'
      aside.innerHTML += `<span class="result ${status}">${status} ${data.id} ${data.name}</span>`

      if (!data.ok) {
        console.error(data)
        return
      }

      ++passed
      return
    }

    if (data.type === 'end') {
      aside.innerHTML += `\n1..${count}\n# tests ${count}\n# passed ${passed}`

      const ok = passed === count ? 'OK' : 'FAIL'
      aside.innerHTML += `<span class="${ok}"># ${ok ? 'ok' : 'not ok'}</span>`
    }
  })

  return tape
}
