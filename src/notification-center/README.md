# NotificationCenter
The component `NotificationCenter` creates a notification badge that appears on the screen either for a duration or until the user acknowledges it.

The `notification-center` element should be included *once* on the page, and all notifications will be created within this element.

## Demo

<notification-center></notification-center>

<table class="example">
  <thead>
    <tr>
      <th>Example</th>
      <th>Description</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <input-button id="notification-link-1" value="Notify Me"></input-button>
      </td>
      <td>Default notification.</td>
      <td>
        xxx
      </td>
    </tr>
    <tr>
      <td>
        <input-button id="notification-link-2" value="Success"></input-button>
        <input-button id="notification-link-3" value="Warning"></input-button>
        <input-button id="notification-link-4" value="Danger"></input-button>
        <input-button id="notification-link-5" value="Info"></input-button>
      </td>
      <td>Default notification with default props.</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-button id="notification-link-6" value="Self Close"></input-button>
      </td>
      <td>Notification that will expire after some time.</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
  </tbody>
</table>

%html%

%js%

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
| `methodName()` | Description |
