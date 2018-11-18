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
| `id` | *string* | Input with `id` attribute. | |
| `name` | *string* | Input with `name` attribute. | |
| `type` | *string* | Type of input (text, password, email). | `text` |
| `required` | *boolean* | Makes the input `required`. | `false` |
| `disabled` | *boolean* | Makes the input `disabled`. | `false` |
| `spellcheck` | *boolean* | Enable `spellcheck` on the input. | `false` |
| `invalid` | *boolean* | Adds the `invalid` attribute. | `false` |
| `aria-invalid` | *boolean* | Adds `aria-invalid` attribute. | `false` |
| `placeholder` | *string* | Inserts `placeholder` text. | |
| `error-message` | *string* | Changes error message text. | |
| `label` | *string* | Adds a label to the input. | |
| `src` | *string* | Adds an icon to the input. | |
| `position` | *string* | The position of an icon, if specified. | |
| `pattern` | *string* | Regex for checking value. | |
| `width` | *string* | Width of the input. | `250px` |
| `radius` | *string* | Radius of the input. | `3px` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods

| Method | Description |
| :--- | :--- |
| `setValid()` | Sets the input to valid. |
| `setInvalid(msg)` | Invalidate the input. |

### Instance Members

| Property | Description |
| :--- | :--- |
| `value` | Get the current value of the input. |
