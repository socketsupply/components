document.body.appendChild(html`
<section id="textarea">
  <h2>Textarea</h2>

  <div class="test-container">
    <span>Default Textarea</span>
    <tonic-textarea></tonic-textarea>
  </div>

  <div class="test-container">
    <span>With Content</span>
    <tonic-textarea>It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way—in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.</tonic-textarea>
  </div>

  <div class="test-container">
    <span>id="textarea-id"</span>
    <tonic-textarea id="textarea-id"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>name="textarea-name"</span>
    <tonic-textarea name="textarea-name"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>placeholder="This is a placeholder"</span>
    <tonic-textarea placeholder="This is a placeholder"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>resize="none"</span>
    <tonic-textarea resize="none"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>spellcheck="true"</span>
    <tonic-textarea spellcheck="true">fdsfds</tonic-textarea>
  </div>

  <div class="test-container">
    <span>spellcheck="false"</span>
    <tonic-textarea spellcheck="false">fdsfds</tonic-textarea>
  </div>

  <div class="test-container">
    <span>disabled="true"</span>
    <tonic-textarea disabled="true"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>disabled="false"</span>
    <tonic-textarea disabled="false"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>required="true"</span>
    <tonic-textarea required="true"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>required="false"</span>
    <tonic-textarea required="false"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>readonly="true"</span>
    <tonic-textarea readonly="true"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>readonly="false"</span>
    <tonic-textarea readonly="false"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>autofocus="true"</span>
    <tonic-textarea autofocus="true"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>autofocus="false"</span>
    <tonic-textarea autofocus="false"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>rows="10"</span>
    <tonic-textarea rows="10"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>cols="10"</span>
    <tonic-textarea cols="10"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>minlength="10"</span>
    <tonic-textarea minlength="10"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>maxlength="100"</span>
    <tonic-textarea maxlength="100"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>width="100%"</span>
    <tonic-textarea width="100%"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>width="200px"</span>
    <tonic-textarea width="100%"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>height="300px"</span>
    <tonic-textarea height="300px"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>radius="10px"</span>
    <tonic-textarea radius="10px"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>theme="light"</span>
    <tonic-textarea theme="light"></tonic-textarea>
  </div>

  <div class="test-container flex-half dark">
    <span>theme="dark"</span>
    <tonic-textarea theme="dark"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>label="Foo Bar Bazz"</span>
    <tonic-textarea label="Foo Bar Bazz"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>autofocus="true"</span>
    <tonic-textarea autofocus="true"></tonic-textarea>
  </div>

</section>
`)

// TODO: write tests

function html ([str, ...strings], ...values) {
  let text = str
  for (let i = 0; i < values.length; i++) {
    text += values[i] + strings[i]
  }

  const tmpl = document.createElement('template')
  tmpl.innerHTML = text
  return tmpl.content.firstElementChild
}
