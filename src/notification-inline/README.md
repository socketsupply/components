# NotificationInline
The component `NotificationInline` creates a notification badge that appears on the screen either for a duration or until the user acknowledges it.

## Demo

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
        <input-button id="notification-inline-link-1" value="Notify Me"></input-button>
      </td>
      <td>Default notification.</td>
      <td>
        <icon-container src="./sprite.svg#code">
        </icon-container>
      </td>
    </tr>
  </tbody>
</table>

<notification-inline id="notification-inline-example-1">
</notification-inline>

<script>
  {
    const notificationInline1 = document.getElementById('notification-inline-example-1')
    const notificationInlineLink1 = document.getElementById('notification-inline-link-1')

    notificationInlineLink1.addEventListener('click', e => {
      notificationInline1.create({
        message: 'Hello, World',
        title: 'Greetings',
        type: 'warning'
      })
    })
  }
</script>

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute |  |
| `name` | *string* | Adds a `name` attribute |  |
| `alert` | *string* | Adds an alert type (success, warn, danger) |  |
| `title` | *string* | Adds a title |  |
| `message` | *string* | Adds a message |  |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
