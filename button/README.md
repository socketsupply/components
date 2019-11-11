# Button

The `Button` component creates a button.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-button
      async="true"
      id="tonic-button-example"
      value="click-me">Click me</tonic-button>
  </div>
</div>

## Code

#### HTML
```html
<tonic-button
  async="true"
  id="tonic-button-example"
  value="click-me">Click me
</tonic-button>
```

#### JS
```js
%js%
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Button with `id` attribute. | |
| `name` | *string* | Button with a `name` attribute. | |
| `type` | *string* | Type of button (i.e. submit). | |
| `value` | *string* | Value of the button. | `Submit` |
| `disabled` | *boolean* | Button with the `disabled` attribute. | `false` |
| `autofocus` | *boolean* | Button with the `autofocus` attribute. | `false` |
| `async` | *boolean* | Make button asynchronous. | `false` |
| `is-active` | *boolean* | Active button. | `false` |
| `width` | *string* | Width of the button. | `150px` |
| `height` | *string* | Height of the button. | `38px` |
| `radius` | *string* | Radius of the button. | `2px` |
| `fill` | *string* | Filled button. |  |
| `text-color` | *string* | TextColor of the button. |  |
| `href` | *string* | Add a location (url) for click event. | |
| `target` | *string* | If you specify target, it will open an href in a new window, unless target is `_self` | `_self` |
| `tabindex` | *number* | Add a `tabindex` for the button. | |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `click()` | Click event |
| `loading(state)` | Removes loading from an async button. |
