const Tonic = require('@optoolco/tonic')
const tape = require('tape')
const { qs } = require('qs')

const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="tabs">
  <h2>Tabs</h2>

  <!-- Default tabs -->
  <div id="tabs-1" class="test-container">
    <span>Default Tabs</span>

    <tonic-tabs selected="tab-2">
      <tonic-tab
        id="tab-1"
        for="tab-panel-1">One</tonic-tab>
      <tonic-tab
        id="tab-2"
        for="tab-panel-2">Two</tonic-tab>
      <tonic-tab
        id="tab-3"
        for="tab-panel-3">Three</tonic-tab>
    </tonic-tabs>

    <tonic-tab-panel id="tab-panel-1">Content One</tonic-tab-panel>
    <tonic-tab-panel id="tab-panel-2">Content Two</tonic-tab-panel>
    <tonic-tab-panel id="tab-panel-3">Content Three</tonic-tab-panel>
  </div>

  <!-- Default tabs -->
  <div id="tabs-2" class="test-container">
    <span>Tabs with nesting</span>

    <tonic-tabs selected="tab-4">
      <tonic-tab
        id="tab-4"
        for="tab-panel-4">One</tonic-tab>
      <tonic-tab
        id="tab-5"
        for="tab-panel-5">Two</tonic-tab>
      <tonic-tab
        id="tab-6"
        for="tab-panel-6">Three</tonic-tab>
    </tonic-tabs>

    <tonic-tab-panel id="tab-panel-4">
      <tonic-select value="b">
        <option value="a">a</option>
        <option value="b">b</option>
        <option value="c">c</option>
      </tonic-select>
    </tonic-tab-panel>
    <tonic-tab-panel id="tab-panel-5">

      <tonic-accordion>
        <tonic-accordion-section
          name="accordion-test-4b"
          id="accordion-test-4b"
          data="preview"
          label="Accordion Test 4b">
          Whatever
        </tonic-accordion-section>
        <tonic-accordion-section
          name="accordion-test-5b"
          id="accordion-test-5b"
          label="Accordion Test 5b">
          Some Content
        </tonic-accordion-section>
        <tonic-accordion-section
          name="accordion-test-6b"
          id="accordion-test-6b"
          label="Accordion Test 6b">
          The visual design includes features intended to help users understand that the accordion provides enhanced keyboard navigation functions. When an accordion header button has keyboard focus, the styling of the accordion container and all its header buttons is changed.
        </tonic-accordion-section>
      </tonic-accordion>
    </tonic-tab-panel>
    <tonic-tab-panel id="tab-panel-6">Content Three</tonic-tab-panel>
  </div>

  <!-- Tabs inside another component -->
  <div id="tabs-3" class="test-container">
    <component-container id="xxx">
      <span>Tabs inanother component</span>

      <tonic-tabs id="tabs-7" selected="tab-7">
        <tonic-tab
          id="tab-7"
          for="tab-panel-7">One</tonic-tab>
        <tonic-tab
          id="tab-8"
          for="tab-panel-8">Two</tonic-tab>
        <tonic-tab
          id="tab-9"
          for="tab-panel-9">Three</tonic-tab>
      </tonic-tabs>

      <tonic-tab-panel id="tab-panel-7">
        <tonic-select value="b">
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
        </tonic-select>
      </tonic-tab-panel>

      <tonic-tab-panel id="tab-panel-8">

        <tonic-accordion>
          <tonic-accordion-section
            name="accordion-test-7"
            id="accordion-test-7"
            data="preview"
            label="Accordion Test 7">
            Whatever
          </tonic-accordion-section>
          <tonic-accordion-section
            name="accordion-test-8"
            id="accordion-test-8"
            label="Accordion Test 8">
            Some Content
          </tonic-accordion-section>
          <tonic-accordion-section
            name="accordion-test-9"
            id="accordion-test-9"
            label="Accordion Test 9">
            The visual design includes features intended to help users understand that the accordion provides enhanced keyboard navigation functions. When an accordion header button has keyboard focus, the styling of the accordion container and all its header buttons is changed.
          </tonic-accordion-section>
        </tonic-accordion>
      </tonic-tab-panel>
      <tonic-tab-panel id="tab-panel-9">Content Three</tonic-tab-panel>
    </component-container>
  </div>
</section>
`)

class ComponentContainer extends Tonic {
  click () {
    this.reRender()
  }

  render () {
    return this.html`
      ${this.childNodes}
    `
  }
}

Tonic.add(ComponentContainer)

tape('{{tabs-3}} has correct default state', t => {
  const container = qs('component-container')

  t.ok(container, 'rendered')
  t.end()
})

function html ([str, ...strings], ...values) {
  let text = str
  for (let i = 0; i < values.length; i++) {
    text += values[i] + strings[i]
  }

  const tmpl = document.createElement('template')
  tmpl.innerHTML = text
  return tmpl.content.firstElementChild
}
