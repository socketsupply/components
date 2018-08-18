# NotificationCenter
The component `NotificationCenter` creates a container for all notifications to be added to.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <input-button id="notification-center-example" value="notify-me">Notify Me</input-button>
  </div>
</div>

<notification-center></notification-center>

## Code

The following code should be included once on the page:

#### HTML
```html
<notification-center></notification-center>
```

---

To create a new notification:

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
| `dismiss` | *boolean* | If set to `false`, the close button will not be added to the notification. | `true` |
| `duration` | *number* | Adds a duration. | `center` |
| `position` | *string* | Position of the notifications, can be `left`, `right` or `center`. | `center` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the notification center. |
| `hide()` | Hides a notification. |
| `click()` | Removes a notification. |
| `create()` | Creates a notification. |
| `destroy()` | Removes a notification. |
