# InputTextarea

The component `InputTextarea` creates a text area.

## Demo

<table class="example">
  <thead>
    <tr>
      <th>Example</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input-textarea placeholder="Type in me"></input-textarea></td>
      <td>
        <span id="textarea-tooltip-1">
          Default Text area with placeholder
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <input-textarea label="Text Area" rows="6" placeholder="Type in me">
It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way—in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.
        </input-textarea>
      </td>
      <td>
        <span id="textarea-tooltip-2">
          Text area with label and content
        </span>
      </td>
    </tr>
  </tbody>
</table>

## Code

#### Html
```html
  <input-textarea
    placeholder="Placeholder"
    rows="6"
    label="Text Area">
    <!-- Content Goes Here -->
  </input-textarea>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Text area with `id` attribute | |
| `name` | *string* | Text area with `name` attribute | |
| `placeholder` | *string* | Add placeholder to text area |  |
| `spellcheck` | *boolean* | Enable spellcheck | `true` |
| `disabled` | *boolean* | Text area with `disabled` attribute | `false` |
| `required` | *boolean* | Set text area to `required` | `false` |
| `readonly` | *boolean* | Set text area to `readonly` | `false` |
| `autofocus` | *boolean* | Enable `autofocus` on the text area | `false` |
| `resize` | *string* | Set to `none` to disable resize | |
| `rows` | *string* | Set number of rows |  |
| `cols` | *string* | Set number of columns |  |
| `minlength` | *string* | Set minimum character length |  |
| `maxlength` | *string* | Set maximum character length |  |
| `width` | *string* | Set width of text area |  |
| `height` | *string* | Set height of text area | `100%` |
| `radius` | *string* | Set radius of text area | `2px` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `value` | A `getter` that provides the current value of the text area from inside of the component. |
