# Toggle

The `Toggle` component creates a toggle.

## Demo

<div class="example">
  <tonic-toggle
    id="toggle-example"
    checked="true"
    label="Change">
  </tonic-toggle>
</div>

## Code

#### HTML
```html
<tonic-toggle
  id="toggle-example"
  label="Change">
</tonic-toggle>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the <code>id</code> attribute <span class="req">required</span> | |
| `name` | *string* | Adds the <code>name</code> attributes. | |
| `disabled` | *boolean* | Makes the toggle disabled. | `false` |
| `checked` | *boolean* | Turns the toggle "on". | `false` |
| `label` | *string* | Adds a label to the toggle | |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods

| Method | Description |
| :--- | :--- |
| `change()` | Bind to `change` event. |

### Instance Members

| Method | Description |
| :--- | :--- |
| `value` | A getter/setter that returns the current value (state) of the toggle. |
