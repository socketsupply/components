# Accordion
The `Accordion` component creates a set of interactive headings that hide and show content sections, with **Keyboard Support**

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-accordion>
      <tonic-accordion-section
        name="accordion-test-1"
        id="accordion-test-1"
        data="preview"
        label="Accordion Test 1">
        Whatever
      </tonic-accordion-section>
      <tonic-accordion-section
        name="accordion-test-2"
        id="accordion-test-2"
        label="Accordion Test 2">
        Some Content
      </tonic-accordion-section>
      <tonic-accordion-section
        name="accordion-test-3"
        id="accordion-test-3"
        label="Accordion Test 3">
        The visual design includes features intended to help users understand that the accordion provides enhanced keyboard navigation functions. When an accordion header button has keyboard focus, the styling of the accordion container and all its header buttons is changed.
      </tonic-accordion-section>
    </tonic-accordion>
  </div>
</div>

Add the `dataAllowMultiple` property to the `tonic-accordion` component to allow multiple sections to be expanded at one time.

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-accordion data-allow-multiple="true">
      <tonic-accordion-section
        name="multiple-accordion-test-1"
        id="multiple-accordion-test-1"
        label="Multiple Accordion Test 1">
        Whatever
      </tonic-accordion-section>
      <tonic-accordion-section
        name="multiple-accordion-test-2"
        id="multiple-accordion-test-2"
        label="Multiple Accordion Test 2">
        Some Content
      </tonic-accordion-section>
      <tonic-accordion-section
        name="multiple-accordion-test-3"
        id="multiple-accordion-test-3"
        label="Multiple Accordion Test 3">
        The visual design includes features intended to help users understand that the accordion provides enhanced keyboard navigation functions. When an accordion header button has keyboard focus, the styling of the accordion container and all its header buttons is changed.
      </tonic-accordion-section>
    </tonic-accordion>
  </div>
</div>

## Code

#### HTML
```html
  <tonic-accordion>
    <tonic-accordion-section
      name="bucket-test-1"
      id="bucket-test-1"
      data="preview"
      label="Accordion Test 1">
      Whatever
    </tonic-accordion-section>
    <tonic-accordion-section
      name="bucket-test-2"
      id="bucket-test-2"
      label="Accordion Test 2">
      Some Content
    </tonic-accordion-section>
    <tonic-accordion-section
      name="bucket-test-3"
      id="bucket-test-3"
      label="Accordion Test 3">
      The visual design includes features intended to help users understand that the accordion provides enhanced keyboard navigation functions. When an accordion header button has keyboard focus, the styling of the accordion container and all its header buttons is changed.
    </tonic-accordion-section>
  </tonic-accordion>
```

## Api

### Properties

for **TonicAccordion**

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `dataAllowMultiple` | *string* | Allow multiple sections to be expanded at one time. | `0` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

for **TonicAccordionSection**

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the `id` attribute. | |
| `name` | *string* | Adds the `name` attribute. | |
| `label` | *string* | Pass into | `0` |

### Instance Members

| Property | Description |
| :--- | :--- |
| `click()` | Click event |
