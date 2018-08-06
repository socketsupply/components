# InputCheckbox

The component `InputCheckbox` is used to create a styled checkbox, with or without a label. You can also create a custom checkbox using SVG icons.

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
      <td>
        <input-checkbox id="checkbox-example-1"></input-checkbox>
      </td>
      <td>Default Checkbox</td>
      <td>
        <icon-container id="checkbox-example-2" src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-checkbox
          id="checkbox-example-3"
          label="Label">
        </input-checkbox>
      </td>
      <td>Checkbox with Label</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-checkbox
          id="checkbox-example-4"
          label="Disabled"
          disabled>
        </input-checkbox>
      </td>
      <td>Checkbox with label and <code>disabled</code> attribute</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-checkbox
          id="checkbox-example-5"
          label="Disabled and Checked"
          disabled
          checked>
        </input-checkbox>
      </td>
      <td>Checkbox with label and <code>disabled</code> & <code>checked</code> attributes</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-checkbox
          id="checkbox-example-6"
          size="25px"
          on="./sprite.svg#custom_on"
          off="./sprite.svg#custom_off">
        </input-checkbox>
      </td>
      <td>Custom SVG Checkbox</td>
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
| `id` | *string* | Adds `id` attribute <span class="req">required</span> |  |
| `name` | *string* | Adds `name` attribute |  |
| `disabled` | *boolean* | Adds `disabled` attribute | `false` |
| `checked` | *boolean* | Adds `checked` attribute | `false` |
| `size` | *string* | Changes the `width` and `height` of the icon | `18px` |
| `color` | *string* | Changes the color of the icon | `var(--primary)` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `addIcon(state, fn)` | Add a custom SVG as the icon for the given state Where the `state` parameter is either `on` or `off` and the `fn` parameter is a function that returns your SVG's xml. The function will receive the color prop as an argument. |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
