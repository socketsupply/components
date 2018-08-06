# NotificationToaster
The component `NotificationToaster` creates a notification badge that appears on
the screen either for a duration or until the user acknowledges it.

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
        <notification-toaster id="toaster-example-1" title="Toaster" message="Hi, I am a toaster"></notification-toaster>
        <input-button id="toaster-link-example-1" value="Click to open"></input-button>
      </td>
      <td>Default notification toaster</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <notification-toaster id="toaster-example-2" title="Toaster 2" message="Hi, I am a toaster"></notification-toaster>
        <input-button id="toaster-link-example-2" value="Click to open"></input-button>
      </td>
      <td>Default notification toaster</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
  </tbody>
</table>

<script>
  const toasterLink1 = document.getElementById('toaster-link-example-1')
  const toaster1 = document.getElementById('toaster-example-1')
  toasterLink1.addEventListener('click', e => toaster1.show())

  const toasterLink2 = document.getElementById('toaster-link-example-2')
  const toaster2 = document.getElementById('toaster-example-2')
  toasterLink2.addEventListener('click', e => toaster2.show())
</script>

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute |  |
| `name` | *string* | Adds a `name` attribute |  |
| `type` | *string* | Adds a type (success, warn, danger) |  |
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
