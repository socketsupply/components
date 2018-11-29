# ToasterInline
The `ToasterInline` component creates an inline toaster item that appears on the screen either for a duration or until the user acknowledges it.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-button
      id="toaster-link-1"
      value="notify">
      Notify Me
    </tonic-button>
  </div>
</div>

<div>
  <tonic-toaster-inline id="toaster-1">
  </tonic-toaster-inline>
</div>

<div>
  <tonic-toaster-inline
    dismiss="false"
    display="true"
    id="toaster-2">
    Displayed initially. Uses <b>html</b>.
  </tonic-toaster-inline>
</div>

## Code

#### HTML
```html
<tonic-toaster-inline id="toaster-1">
</tonic-toaster-inline>
```

#### JS
```js
%js%
```

---

An inline toaster that is displayed initially:

#### HTML
```html
<tonic-toaster-inline
  id="toaster-2"
  dismiss="false"
  display="true">
  Displayed initially. Uses HTML.
</tonic-toaster-inline>
```

NOTE: An inline toaster item that is displayed initially must declare each property in the HTML and display it using `display="true"`. This will create the notification.

Otherwise, the properties for the toaster item to be created must be specified in the javascript, where it is created.

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute. |  |
| `name` | *string* | Adds a `name` attribute. |  |
| `title` | *string* | Adds a title. |  |
| `message` | *string* | Adds a message. If no message attribute is provided the inner HTML will be used. |  |
| `type` | *string* | Adds an alert type, `success`, `warning`, `danger` or `info`). |  |
| `duration` | *number* | The duration that the component will be displayed before being hidden. |  |
| `dismiss` | *boolean* | If set to `false`, the close button will not be added to the toaster item. |  |
| `display` | *boolean* | Specifies whether toaster is displayed initially. | `false` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the toaster. |
| `hide()` | Hides a toaster item. |
| `click()` | Removes a toaster item. |
| `create()` | Creates a toaster item. |
| `destroy()` | Removes a toaster item. |
