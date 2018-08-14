# NotificationInline
The component `NotificationInline` creates a notification badge that appears on the screen either for a duration or until the user acknowledges it.

## Demo

The following examples are inline notifications without a specified `type`.

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
        <input-button
          id="notification-inline-button-1"
          value="notify">
          Notify Me
        </input-button>
      </td>
      <td>Default notification.</td>
    </tr>
    <tr>
      <td>
        <input-button
          id="notification-inline-button-6"
          value="notify">
          Notify Me
        </input-button>
      </td>
      <td>Alert with a title and message</td>
    </tr>
    <tr>
      <td>
        <input-button
          id="notification-inline-button-7"
          value="self-close">
          Self Close
        </input-button>
      </td>
      <td>This alert will close automatically after the specified <code>duration</code></td>
    </tr>
  </tbody>
</table>

<notification-inline id="notification-inline-example-1">
</notification-inline>

<notification-inline id="notification-inline-example-6">
</notification-inline>

<notification-inline id="notification-inline-example-7">
</notification-inline>

The following examples are inline notifications with a specified `type` and associated icon, the type of which can be one of: `success`, `warning`, `danger`, or `info`.

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
        <input-button
          id="notification-inline-button-2"
          value="success">
          Success
        </input-button>
      </td>
      <td>Success Alert</td>
    </tr>
    <tr>
      <td>
        <input-button
          id="notification-inline-button-3"
          value="warning">
          Warning
        </input-button>
      </td>
      <td>Warning Alert</td>
    </tr>
    <tr>
      <td>
        <input-button
          id="notification-inline-button-4"
          value="danger">
          Danger
        </input-button>
      </td>
      <td>Danger Alert</td>
    </tr>
    <tr>
      <td>
        <input-button
          id="notification-inline-button-5"
          value="information">
          Information
        </input-button>
      </td>
      <td>Info Alert</td>
    </tr>
  </tbody>
</table>

%html%

```html
%html%
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute |  |
| `name` | *string* | Adds a `name` attribute |  |
| `title` | *string* | Adds a title |  |
| `message` | *string* | Adds a message. If no message attribute is provided the inner HTML will be used. |  |
| `type` | *string* | Adds an alert type, `success`, `warning`, `danger` or `info`) |  |
| `duration` | *string* | The duration that the component will be displayed before being hidden. |  |
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
