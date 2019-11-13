document.body.appendChild(html`
<section id="sprite">
  <h2>Sprite</h2>

  <!-- Default inline toaster -->
  <div class="test-container">
    <span>Sprite</span>
  </div>

</section>
`)

// TODO write tests

function html ([str, ...strings], ...values) {
  let text = str
  for (let i = 0; i < values.length; i++) {
    text += values[i] + strings[i]
  }

  const tmpl = document.createElement('template')
  tmpl.innerHTML = text
  return tmpl.content.firstElementChild
}
