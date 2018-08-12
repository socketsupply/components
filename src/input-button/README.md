# InputButton

The component `InputButton` creates a button.

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
      <td><input-button></input-button></td>
      <td>
        <span id="button-example-tooltip-1">Default button</span>
      </td>
    </tr>
    <tr>
      <td><input-button fill="var(--accent)" text-color="white"></input-button></td>
      <td>
        <span id="button-example-tooltip-2">Fill button</span>
      </td>
    </tr>
    <tr>
      <td><input-button disabled="true"></input-button></td>
      <td>
        <span id="button-example-tooltip-3">Button with <code>disabled</code> attribute</span>
      </td>
    </tr>
    <tr>
      <td>
        <input-button
          async="true"
          id="loading-button-example"
          value="click-me">Click me
        </input-button>
      </td>
      <td>
        <span id="button-example-tooltip-4">Loading button</span>
      </td>
    </tr>
    <tr>
      <td><input-button width="100%"></input-button></td>
      <td>
        <span id="button-example-tooltip-5">Full width button</span>
      </td>
    </tr>
  </tbody>
</table>

%html%

## Code

```html
%html%
```

```js
%js%
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Button with `id` attribute | |
| `name` | *string* | Button with a `name` attribute | |
| `value` | *string* | Value of the button <span class="req">required</span> | `Submit` |
| `type` | *string* | Type of button (i.e. submit) | |
| `disabled` | *boolean* | Button with the `disabled` attribute | `false` |
| `autofocus` | *boolean* | Button with the `autofocus` attribute | `false` |
| `async` | *boolean* | Loading button | `false` |
| `is-active` | *boolean* | Active button | `false` |
| `width` | *string* | Width of the button | `150px` |
| `height` | *string* | Height of the button | `38px` |
| `radius` | *string* | Radius of the button | `2px` |
| `fill` | *string* | Filled button |  |
| `text-color` | *string* | TextColor of the button |  |
| `href` | *string* | Add a location (url) for click event | |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `click()` | Click event |
| `done()` | Removes loading from an async button |
