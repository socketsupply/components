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

<script>
  {
    const notificationInline1 = document.getElementById('notification-inline-example-1')
    const notificationInlineLink1 = document.getElementById('notification-inline-link-1')

    notificationInlineLink1.addEventListener('click', e => {
      notificationInline1.create({
        message: 'This is an alert'
      })
    })

    const notificationInline2 = document.getElementById('notification-inline-example-2')
    const notificationInlineLink2 = document.getElementById('notification-inline-link-2')

    notificationInlineLink2.addEventListener('click', e => {
      notificationInline2.create({
        type: 'success'
      })
    })

    const notificationInline3 = document.getElementById('notification-inline-example-3')
    const notificationInlineLink3 = document.getElementById('notification-inline-link-3')

    notificationInlineLink3.addEventListener('click', e => {
      notificationInline3.create({
        type: 'warning'
      })
    })

    const notificationInline4 = document.getElementById('notification-inline-example-4')
    const notificationInlineLink4 = document.getElementById('notification-inline-link-4')

    notificationInlineLink4.addEventListener('click', e => {
      notificationInline4.create({
        type: 'danger',
        title: 'Danger zone!'
      })
    })

    const notificationInline5 = document.getElementById('notification-inline-example-5')
    const notificationInlineLink5 = document.getElementById('notification-inline-link-5')

    notificationInlineLink5.addEventListener('click', e => {
      notificationInline5.create({
        type: 'info',
        message: 'This is an information alert'
      })
    })

    const notificationInline6 = document.getElementById('notification-inline-example-6')
    const notificationInlineLink6 = document.getElementById('notification-inline-link-6')

    notificationInlineLink6.addEventListener('click', e => {
      notificationInline6.create({
        title: 'Note',
        message: 'This is an alert containing both a title and a message.'
      })
    })

    const notificationInline7 = document.getElementById('notification-inline-example-7')
    const notificationInlineLink7 = document.getElementById('notification-inline-link-7')

    notificationInlineLink7.addEventListener('click', e => {
      notificationInline7.create({
        title: 'This alert will self destruct in 3 seconds.',
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
