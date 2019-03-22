# Checkbox

The `Checkbox` component is used to create a styled checkbox, with or without a
label. You can also create a custom checkbox using SVG icons.

> *__Note:__ This component requires the `tonic-sprite` component.*

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-checkbox
      id="tonic-checkbox-example"
      checked="true"
      label="Checkbox with Label">
    </tonic-checkbox>
  </div>
</div>

## Code

#### HTML
```html
<tonic-checkbox
  id="tonic-checkbox-example"
  label="Checkbox with Label">
</tonic-checkbox>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds `id` attribute. <span class="req">required</span> |  |
| `name` | *string* | Adds `name` attribute. |  |
| `disabled` | *boolean* | Adds `disabled` attribute. | `false` |
| `checked` | *boolean* | Adds `checked` attribute. | `false` |
| `size` | *string* | Changes the `width` and `height` of the icon. | `18px` |
| `color` | *string* | Changes the color of the icon. | <code>--primary</code> |
| `tabindex` | *number* | Add a `tabindex` for the checkbox. | |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Properties

| Method | Description |
| :--- | :--- |
| `value` | A getter/setter that returns `true` if the checkbox is checked or `false` if the checkbox is not checked. |

### Static Methods

| Method | Description |
| :--- | :--- |
| `addIcon(state, fn)` | Add a custom SVG as the icon for the given state Where the `state` parameter is either `on` or `off` and the `fn` parameter is a function that returns your SVG's xml. The function will receive the color prop as an argument. |
