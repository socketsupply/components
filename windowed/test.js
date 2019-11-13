document.body.appendChild(html`
<section id="windowed">
  <h2>Windowed</h2>

  <div class="test-container">
    TBD
  </div>

</section>
`)

// TODO: tests

function html ([str, ...strings], ...values) {
  let text = str
  for (let i = 0; i < values.length; i++) {
    text += values[i] + strings[i]
  }

  const tmpl = document.createElement('template')
  tmpl.innerHTML = text
  return tmpl.content.firstElementChild
}
