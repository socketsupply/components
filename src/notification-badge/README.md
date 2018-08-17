# NotificationBadge
The component `NotificationBadge` creates a notification badge with a counter and unread alert.

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
        <notification-badge></notification-badge>
        <div class="notification-counter">
          <span class="add-notification">Add</span>
          <span class="subtract-notification">Subtract</span>
        </div>
      </td>
      <td>
        <span id="notification-badge-tooltip-1">
          Default Notification Badge
        </span>
      </td>
    </tr>
  </tbody>
</table>

## Code

To update the notification count, pass in the `count` property.

#### HTML
```html
<notification-badge></notification-badge>
```

#### JS
```js
notificationBadge.reRender(props => ({
  ...props,
  count: `${count}`
}))
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the `id` attribute | |
| `name` | *string* | Adds the `name` attribute | |
| `count` | *string* | Updates the `count` property | `0` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |
