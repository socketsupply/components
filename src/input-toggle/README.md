# InputToggle

The component `InputToggle` creates a toggle.

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
      <td><input-toggle id="toggle-example-1"></input-toggle></td>
      <td>
        <span id="toggle-example-tooltip-1">
          Default toggle
        </span>
      </td>
    </tr>
    <tr>
      <td><input-toggle checked id="toggle-example-2"></input-toggle></td>
      <td>
        <span id="toggle-example-tooltip-2">
          Default toggle checked
        </span>
      </td>
    </tr>
    <tr>
      <td><input-toggle id="toggle-example-3" label="Label"></input-toggle></td>
      <td>
        <span id="toggle-example-tooltip-3">
          Toggle with label
        </span>
      </td>
    </tr>
    <tr>
      <td><input-toggle id="toggle-example-4" label="Disabled" disabled></input-toggle></td>
      <td>
        <span id="toggle-example-tooltip-4">
          Toggle with <code>disabled</code> attribute and label
        </span>
      </td>
    </tr>
  </tbody>
</table>

%html%

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the <code>id</code> attribute <span class="req">required</span> | |
| `name` | *string* | Adds the <code>name</code> attributes | |
| `disabled` | *boolean* | Makes the toggle disabled | `false` |
| `checked` | *boolean* | Turns the toggle "on" | `false` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `change()` | Bind to `change` event |
