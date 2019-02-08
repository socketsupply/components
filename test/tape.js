const tape = require('tape')

const stream = tape.createStream({ objectMode: true })

stream.on('data', data => {
  const section = document.getElementById('badge')
  const aside = section.querySelector('aside')

  if (data.type === 'test') {
    aside.innerHTML += `<span class="title"># ${data.name}</span>`
    return
  }

  if (data.type === 'assert') {
    let status = data.ok ? 'OK' : 'FAIL'
    aside.innerHTML += `<span class="result ${status}">${status} ${data.id} ${data.name}</span>`

    if (!data.ok) {
      console.error(data)
    }

    return
  }

  if (data.type === 'end') {
    aside.innerHTML += '<span>END</span>'
  }
})

module.exports = tape
