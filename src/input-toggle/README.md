# InputToggle

The component `InputToggle` creates a toggle.

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
      <td><input-toggle id="toggle-example-1"></input-toggle></td>
      <td>Default toggle</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-toggle checked id="toggle-example-2"></input-toggle></td>
      <td>Default toggle checked</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-toggle id="toggle-example-3" label="Label"></input-toggle></td>
      <td>Toggle with label</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-toggle id="toggle-example-4" label="Disabled" disabled></input-toggle></td>
      <td>Toggle with <code>disabled</code> attribute and label</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
  </tbody>
</table>

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the <code>id</code> attribute <span class="req">required</span> | |
| `name` | *string* | Adds the <code>name</code> attributes | |
| `disabled` | *boolean* | Makes the toggle disabled | *false* |
| `checked` | *boolean* | Turns the toggle "on" | *false* |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
