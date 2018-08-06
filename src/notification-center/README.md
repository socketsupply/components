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
        <input-button id="toaster-link-1" value="Notify Me"></input-button>
      </td>
      <td>Default notification toaster.</td>
      <td>
        <icon-container src="./sprite.svg#code">
        </icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-button id="toaster-link-2" value="Success"></input-button>
        <input-button id="toaster-link-3" value="Warning"></input-button>
        <input-button id="toaster-link-4" value="Danger"></input-button>
        <input-button id="toaster-link-5" value="Info"></input-button>
      </td>
      <td>Default notification toaster with default props.</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-button id="toaster-link-6" value="Self Close"></input-button>
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
      type: 'success'
    })
  })

  const toasterLink3 = document.getElementById('toaster-link-3')
  toasterLink3.addEventListener('click', e => {
    toaster.create({
      type: 'warning'
    })
  })

  const toasterLink4 = document.getElementById('toaster-link-4')
  toasterLink4.addEventListener('click', e => {
    toaster.create({
      type: 'danger'
    })
  })

  const toasterLink5 = document.getElementById('toaster-link-5')
  toasterLink5.addEventListener('click', e => {
    toaster.create({
      type: 'info'
    })
  })

  const toasterLink6 = document.getElementById('toaster-link-6')
  toasterLink6.addEventListener('click', e => {
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
