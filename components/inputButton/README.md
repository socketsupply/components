# InputButton

The component `InputButton` creates a button.

## Demo

<table>
  <thead>
    <tr>
      <th>Example</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input-button></input-button></td>
      <td>Default button</td>
    </tr>
    <tr>
      <td><input-button fill="var(--accent)" text-color="white"></input-button></td>
      <td>Fill button</td>
    </tr>
    <tr>
      <td><input-button disabled="true"></input-button></td>
      <td>Button with <code>disabled</code> attribute</td>
    </tr>
    <tr>
      <td><input-button value="Click me"></input-button></td>
      <td>Loading button</td>
    </tr>
    <tr>
      <td><input-button radius="50px"></input-button></td>
      <td>Rounded button</td>
    </tr>
    <tr>
      <td><input-button width="100%"></input-button></td>
      <td>Full width button</td>
    </tr>
  </tbody>
</table>

## Api

### Properties

Value is required.

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `disabled` | *boolean* | Makes the button disabled | *false* |
| `type` | *string* | Type of button (i.e. submit) | *"text"* |
| `width` | *string* | Width of the button | *300* |
| `value` | *string* | Value of the button | *Submit* |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
