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
        <content-tooltip id="notification-center-example-1">
          <icon-container src="./sprite.svg#code">
          </icon-container>
        </content-tooltip>
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

<template for="notification-center-example-1">
  <p>HTML</p>
  <pre>
    <code>&lt;notification-center&gt;&lt;/notification-center&gt;</code>
  </pre>

  <p>JS</p>
  <pre>
    <code>
notification.create({
  message: 'Hello, World', title: 'Greetings'
})
    </code>
  </pre>
</template>

<script>
  {
    const notification = document.getElementsByTagName('notification-center')[0]

    const notificationLink1 = document.getElementById('notification-link-1')
    notificationLink1.addEventListener('click', e => {
      notification.create({
        message: 'Hello, World', title: 'Greetings'
      })
    })

    const notificationLink2 = document.getElementById('notification-link-2')
    notificationLink2.addEventListener('click', e => {
      notification.create({
        type: 'success'
      })
    })

    const notificationLink3 = document.getElementById('notification-link-3')
    notificationLink3.addEventListener('click', e => {
      notification.create({
        type: 'warning'
      })
    })

    const notificationLink4 = document.getElementById('notification-link-4')
    notificationLink4.addEventListener('click', e => {
      notification.create({
        type: 'danger'
      })
    })

    const notificationLink5 = document.getElementById('notification-link-5')
    notificationLink5.addEventListener('click', e => {
      notification.create({
        type: 'info'
      })
    })

    const notificationLink6 = document.getElementById('notification-link-6')
    notificationLink6.addEventListener('click', e => {
      notification.create({
        message: 'Will self destruct in 3 seconds',
        title: 'Howdy',
        duration: 3e3
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
