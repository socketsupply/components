# NotificationCenter
The component `NotificationCenter` creates a notification badge that appears on the screen either for a duration or until the user acknowledges it.

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
        <input-button id="toaster-link-1" value="Click to open"></input-button>
      </td>
      <td>Default notification toaster.</td>
      <td>
        <icon-container src="./sprite.svg#code">
        </icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-button id="toaster-link-2" value="Click to open"></input-button>
      </td>
      <td>Default notification toaster with default props.</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-button id="toaster-link-3" value="Click to open"></input-button>
      </td>
      <td>Notification that will expire after some time.</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
  </tbody>
</table>

<script>
  const toaster = document.getElementsByTagName('notification-center')[0]

  const toasterLink1 = document.getElementById('toaster-link-1')
  toasterLink1.addEventListener('click', e => {
    toaster.create({ message: 'Hello, World', title: 'Greetings' })
  })

  const toasterLink2 = document.getElementById('toaster-link-2')
  toasterLink2.addEventListener('click', e => {
    toaster.create({
      title: 'Hello there',
      message: `This is your last warning! This is your last warning! This is your last warning! This is your last warning! This is your last warning!`,
      type: 'danger'
    })
  })

  const toasterLink3 = document.getElementById('toaster-link-3')
  toasterLink3.addEventListener('click', e => {
    toaster.create({
      message: 'Will self destruct in 3 seconds',
      title: 'Howdy',
      duration: 3e3
    })
  })
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
