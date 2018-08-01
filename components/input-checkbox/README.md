# InputCheckbox

The component `InputCheckbox` is used to create a styled checkbox, with or without a label. You can also create a custom checkbox using SVG icons.

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
      <td>
        <input-checkbox></input-checkbox>
      </td>
      <td>Default Checkbox</td>
    </tr>
    <tr>
      <td>
        <input-checkbox
          id="input-checkbox-example-2"
          label="Label">
        </input-checkbox>
      </td>
      <td>Checkbox with Label</td>
    </tr>
    <tr>
      <td>
        <input-checkbox
          id="input-checkbox-example-3"
          label="Disabled"
          disabled>
        </input-checkbox>
      </td>
      <td>Checkbox with label and <code>disabled</code> attribute</td>
    </tr>
    <tr>
      <td>
        <input-checkbox
          id="input-checkbox-example-4"
          label="Disabled and Checked"
          disabled checked>
        </input-checkbox>
      </td>
      <td>Checkbox with label and <code>disabled</code> & <code>checked</code> attributes</td>
    </tr>
    <tr>
      <td>
        <input-checkbox id="input-checkbox-example-5"></input-checkbox>
      </td>
      <td>Custom SVG Checkbox</td>
    </tr>
  </tbody>
</table>

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds `id` attribute | *none* |
| `name` | *string* | Adds `name` attribute | *none* |
| `disabled` | *boolean* | Adds `disabled` attribute | *#000* |
| `checked` | *boolean* | Adds `checked` attribute | *#000* |
| `size` | *string* | Changes the `width` and `height` of the icon | *18px* |
| `color` | *string* | Changes the color of the icon | *var(--primary)* |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `addIcon(state, fn)` | Add a custom SVG as the icon for the given state Where the `state` parameter is either `on` or `off` and the `fn` parameter is a function that returns your SVG's xml. The function will receive the color prop as an argument. |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
