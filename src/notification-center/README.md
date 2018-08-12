# NotificationCenter
The component `NotificationCenter` creates a container for all notifications to be added to.

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
      <td>
        <input-button id="notification-button-1" value="Notify Me"></input-button>
      </td>
      <td>
        <span id="notification-center-tooltip-1">
          Default notification
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <input-button id="notification-button-2" value="Success"></input-button>
        <input-button id="notification-button-3" value="Warning"></input-button>
        <input-button id="notification-button-4" value="Danger"></input-button>
        <input-button id="notification-button-5" value="Info"></input-button>
      </td>
      <td>
        <span id="notification-center-tooltip-2">
          Default notification with default props
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <input-button id="notification-button-6" value="Self Close"></input-button>
      </td>
      <td>
        <span id="notification-center-tooltip-3">
          Notification that will expire after some time
        </span>
      </td>
    </tr>
  </tbody>
</table>

%html%

## Code

The following code should be included once on the page:

```html
%html%
```

To create a new notification:

```js
%js%
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute |  |
| `name` | *string* | Adds a `name` attribute |  |
| `type` | *string* | Adds an alert type (`success`, `warning`, `danger`, `info`) |  |
| `title` | *string* | Adds a title |  |
| `message` | *string* | Adds a message |  |
| `position` | *string* | Position of the notifications, can be `left`, `right` or `center` | `center` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the notification center |
| `hide()` | Removes a notification |
| `click()` | Removes a notification |
| `create()` | Creates a notification |
| `destroy()` | Removes a notification |
