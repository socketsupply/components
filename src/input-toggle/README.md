# InputToggle

The component `InputToggle` creates a toggle.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <input-toggle id="toggle-example" label="Change"></input-toggle>
  </div>
</div>

## Code

#### HTML
```html
%html%
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the <code>id</code> attribute <span class="req">required</span> | |
| `name` | *string* | Adds the <code>name</code> attributes. | |
| `disabled` | *boolean* | Makes the toggle disabled. | `false` |
| `checked` | *boolean* | Turns the toggle "on". | `false` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods

| Method | Description |
| :--- | :--- |
| `change()` | Bind to `change` event. |

### Instance Members

| Method | Description |
| :--- | :--- |
| `value` | A `getter` that returns the current value of the textarea. |
