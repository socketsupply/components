# Select

The `Select` component creates a select input.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-select name="select" label="Select an Option" id="options-example-1">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>
</div>

## Code

#### HTML
```html
<tonic-select name="select">
  <option value="a">Option A</option>
  <option value="b">Option B</option>
  <option value="c">Option C</option>
</tonic-select>
```

#### JS
```js
%js%
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Select box with `id` attribute. | |
| `name` | *string* | Select box with `name` attribute. | |
| `required` | *boolean* | Makes the select box required. | `false` |
| `disabled` | *boolean* | Makes the select box disabled. | `false` |
| `label` | *string* | Adds a label to the select box. | |
| `width` | *string* | Width of the select box. | `250px` |
| `height` | *string* | Height of the select box. | |
| `radius` | *string* | Radius of the select box. | `2px` |
| `multiple` | *boolean* | Show as multiple select. | |
| `size` | *string* | The number of visible items for a multiple select. |  |
| `value` | *string* | The default value that will be selected. | |
| `tabindex` | *number* | Add a `tabindex` for the select box. | |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods

| Method | Description |
| :--- | :--- |
| `change()` | The native `change` event on the select input. |
| `loading(state)` | Adds loading to the current select box. | |

### Instance Members

| Property | Description |
| :--- | :--- |
| `option` | A getter/setter that provides the currently selected option from the select input inside the component. |
| `value` | A getter/setter that provides the current value of the select input from inside of the component. |
| `selectedIndex` | A getter/setter that provides the selected index of the select input inside the component. |
