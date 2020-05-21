# Textarea

The `Textarea` component creates a text area.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
  <tonic-textarea label="Text Area" rows="6" placeholder="Type in me">It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way—in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.</tonic-textarea>
  </div>
</div>

## Code

#### Html
```html
<tonic-textarea
  placeholder="Placeholder"
  rows="6"
  label="Text Area">
  <!-- Content Goes Here -->
</tonic-textarea>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Text area with `id` attribute. <span class="req">required</span> |
| `ariaLabelledby` | *string* | Sets the `area-labelledby` attribute. |  |
| `autofocus` | *boolean* | Enable `autofocus` on the text area. | `false` |
| `cols` | *string* | Set number of columns. |  |
| `disabled` | *boolean* | Text area with `disabled` attribute. | `false` |
| `height` | *string* | Set height of text area. | `100%` |
| `label` | *string* | Creates a label. |  |
| `maxlength` | *string* | Set the maximum character length. |  |
| `minlength` | *string* | Set the minimum character length. |  |
| `name` | *string* | Text area with `name` attribute. | |
| `persistSize` | *boolean* | Persist the resized width and height | `false` |
| `placeholder` | *string* | Add placeholder to text area. |  |
| `radius` | *string* | Set radius of text area. | `2px` |
| `readonly` | *boolean* | Set text area to `readonly`. | `false` |
| `required` | *boolean* | Set text area to `required`. | `false` |
| `resize` | *string* | Set to `none` to disable resize. | |
| `rows` | *string* | Set number of rows. |  |
| `spellcheck` | *boolean* | Enable spellcheck. | `true` |
| `tabindex` | *number* | Add a `tabindex` for the text area. | |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |
| `width` | *string* | Set width of text area. |  |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `value` | A getter/setter that provides the current value of the text area from inside of the component. |
