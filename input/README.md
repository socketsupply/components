# Input

The `Input` component creates an input that can be invalidated.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-input
      label="Email Address"
      type="email"
      width="280px"
      id="tonic-input-example"
      placeholder="Enter a valid email address"
      spellcheck="false"
      error-message="Invalid Email">
    </tonic-input>
    <span id="tonic-input-state"><span>
  </div>
</div>

## Code

#### HTML

```html
<tonic-input
  label="Email Address"
  type="email"
  width="280px"
  id="tonic-input-example"
  placeholder="Enter a valid email address"
  spellcheck="false"
  error-message="Invalid Email">
</tonic-input>
```

Native auto-complete is also supported.

```html
<tonic-input
  label="Email Address"
  type="email"
  id="tonic-input-example"
>
  <option value="a">primary@foo.com</option>
  <option value="b">secondary@foo.com</option>
</tonic-input>
```

---

The input will validate automatically if you specify the `type` or the `pattern` attribute.

You can also validate or invalidate an input with Javascript using the methods `setValid()` and `setInvalid()`

#### JS
```js
setInvalid.addEventListener('click', (e) => {
  input.setInvalid('There was a problem')
})
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Input with `id` attribute. <span class="req">required</span> | |
| `aria-invalid` | *boolean* | Adds `aria-invalid` attribute. | `false` |
| `aria-labelledby` | *string* | Adds `aria-labelledby` attribute. | `false` |
| `disabled` | *boolean* | Makes the input `disabled`. | `false` |
| `error-message` | *string* | Changes error message text. | |
| `invalid` | *boolean* | Adds the `invalid` attribute. | `false` |
| `label` | *string* | Adds a label to the input. | |
| `name` | *string* | Input with `name` attribute. | |
| `pattern` | *string* | Regex for checking value. | |
| `placeholder` | *string* | Inserts `placeholder` text. | |
| `position` | *string* | The position of an icon, if specified. | |
| `radius` | *string* | Radius of the input. | `3px` |
| `required` | *boolean* | Makes the input `required`. | `false` |
| `readonly` | *boolean* | Makes the input `readonly`. | `false` |
| `spellcheck` | *boolean* | Enable `spellcheck` on the input. | `false` |
| `src` | *string* | The src to use for the icon. | |
| `symbol-id` | *string* | The symbol id to use for the icon. | |
| `fill` | *string* | The fill color to use for the icon. | |
| `color` | *string* | The path color to use for the icon. | |
| `tabindex` | *number* | Add a `tabindex` for the input. | |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |
| `type` | *string* | Type of input (text, password, email). | `text` |
| `width` | *string* | Width of the input. | `250px` |

### Instance Methods

| Method | Description |
| :--- | :--- |
| `setValid()` | Sets the input to valid. |
| `setInvalid(msg)` | Invalidate the input. |

### Instance Members

| Property | Description |
| :--- | :--- |
| `value` | Getter/setter for the value of the input. |
