# NotificationInline
The component `NotificationInline` creates a notification badge that appears on the screen either for a duration or until the user acknowledges it.

## Demo

The following examples are inline notifications without a specified `type`.

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
        <input-button
          id="notification-inline-link-1"
          value="Notify Me">
        </input-button>
      </td>
      <td>Default notification.</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-button
          id="notification-inline-link-6"
          value="Notify Me">
        </input-button>
      </td>
      <td>Alert with a title and message</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-button
          id="notification-inline-link-7"
          value="Self Close">
        </input-button>
      </td>
      <td>This alert will close automatically after the specified <code>duration</code></td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
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
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <input-button
          id="notification-inline-link-2"
          value="Success">
        </input-button>
      </td>
      <td>Success Alert</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-button
          id="notification-inline-link-3"
          value="Warning">
        </input-button>
      </td>
      <td>Warning Alert</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-button
          id="notification-inline-link-4"
          value="Danger">
        </input-button>
      </td>
      <td>Danger Alert</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-button
          id="notification-inline-link-5"
          value="Information">
        </input-button>
      </td>
      <td>Info Alert</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
  </tbody>
</table>

<notification-inline id="notification-inline-example-2">
</notification-inline>

<notification-inline id="notification-inline-example-3">
</notification-inline>

<notification-inline id="notification-inline-example-4">
</notification-inline>

<notification-inline id="notification-inline-example-5">
</notification-inline>

%js%

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute |  |
| `name` | *string* | Adds a `name` attribute |  |
| `title` | *string* | Adds a title |  |
| `message` | *string* | Adds a message |  |
| `type` | *string* | Adds an alert type, `success`, `warning`, `danger` or `info`) |  |
| `duration` | *string* | Adds a message |  |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
