# Toaster
The `Toaster` component creates a container for all toaster items to be added to.

## Demo

<tonic-toaster></tonic-toaster>

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-button
      id="tonic-toaster-example"
      value="notify-me">
      Notify Me
      </tonic-button>
  </div>
</div>

## Code

The following code should be included once on the page:

#### HTML
```html
<tonic-toaster></tonic-toaster>
```

---

To create a new toaster item:

#### JS
```js
%js%
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute. |  |
| `name` | *string* | Adds a `name` attribute. |  |
| `type` | *string* | Adds an alert type (`success`, `warning`, `danger`, `info`). |  |
| `title` | *string* | Adds a title. |  |
| `message` | *string* | Adds a message. |  |
| `dismiss` | *boolean* | If set to `false`, the close button will not be added to the toaster. | `true` |
| `duration` | *number* | Adds a duration. | `center` |
| `position` | *string* | Position of the toaster items, can be `left`, `right` or `center`. | `center` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the toaster. |
| `hide()` | Hides a toaster item. |
| `click()` | Removes a toaster item. |
| `create()` | Creates a toaster item. |
| `destroy()` | Removes a toaster item. |
