# InputButton

The component `InputButton` creates a button.

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
      <td><input-button></input-button></td>
      <td>Default button</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-button fill="var(--accent)" text-color="white"></input-button></td>
      <td>Fill button</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-button disabled="true"></input-button></td>
      <td>Button with <code>disabled</code> attribute</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-button value="Click me"></input-button></td>
      <td>Loading button</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-button width="100%"></input-button></td>
      <td>Full width button</td>
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
| `id` | *string* | Button with `id` attribute | |
| `name` | *string* | Button with a `name` attribute | |
| `value` | *string* | Value of the button <span class="req">required</span> | *Submit* |
| `type` | *string* | Type of button (i.e. submit) | *submit* |
| `disabled` | *boolean* | Button with the `disabled` attribute | *false* |
| `autofocus` | *boolean* | Button with the `autofocus` attribute | *false* |
| `isLoading` | *boolean* | Loading button | *false* |
| `isActive` | *boolean* | Active button | *false* |
| `width` | *string* | Width of the button | *150px* |
| `height` | *string* | Height of the button | *38px* |
| `radius` | *string* | Radius of the button | *2px* |
| `fill` | *string* | Filled button |  |
| `textColor` | *string* | TextColor of the button |  |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
