# NotificationInline
The component `NotificationInline` creates a notification badge that appears on the screen either for a duration or until the user acknowledges it.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <input-button
      id="notification-link-1"
      value="notify">
      Notify Me
    </input-button>
  </div>
</div>

<notification-inline id="notification-1"></notification-inline>

<notification-inline dismiss="false" display="true" id="notification-2">
  Displayed initially. Uses <b>html</b>.
</notification-inline>

## Code

#### HTML
```html
<notification-inline id="notification-1"></notification-inline>
```

#### JS
```js
%js%
```

---

An example of an inline notification that is displayed initially:

#### HTML
```html
<notification-inline
  id="notification-2"
  dismiss="false"
  display="true">
  Displayed initially. Uses HTML.
</notification-inline>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute. |  |
| `name` | *string* | Adds a `name` attribute. |  |
| `title` | *string* | Adds a title. |  |
| `message` | *string* | Adds a message. If no message attribute is provided the inner HTML will be used. |  |
| `type` | *string* | Adds an alert type, `success`, `warning`, `danger` or `info`). |  |
| `duration` | *string* | The duration that the component will be displayed before being hidden. |  |
| `dismiss` | *boolean* | If set to `false`, the close button will not be added to the notification. |  |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the notification center. |
| `hide()` | Hides a notification. |
| `click()` | Removes a notification. |
| `create()` | Creates a notification. |
| `destroy()` | Removes a notification. |
