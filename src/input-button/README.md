# InputButton

The component `InputButton` creates a button.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <input-button
      async="true"
      id="input-button-example"
      value="click-me">Click me
    </input-button>
  </div>
</div>

## Code

#### HTML
```html
%html%
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
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `click()` | Click event |
| `loading(state)` | Removes loading from an async button. |
