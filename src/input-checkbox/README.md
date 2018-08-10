# InputCheckbox

The component `InputCheckbox` is used to create a styled checkbox, with or without a label. You can also create a custom checkbox using SVG icons.

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
        <input-checkbox id="checkbox-example-1"></input-checkbox>
      </td>
      <td>
        <span id="checkbox-example-tooltip-1">Default Checkbox</span>
      </td>
    </tr>
    <tr>
      <td>
        <input-checkbox
          id="checkbox-example-2"
          label="Label">
        </input-checkbox>
      </td>
      <td>
        <span id="checkbox-example-tooltip-2">Checkbox with Label</span>
      </td>
    </tr>
    <tr>
      <td>
        <input-checkbox
          id="checkbox-example-3"
          label="Disabled"
          disabled>
        </input-checkbox>
      </td>
      <td>
        <span id="checkbox-example-tooltip-3">
          Checkbox with label and <code>disabled</code> attribute
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <input-checkbox
          id="checkbox-example-4"
          label="Disabled and Checked"
          disabled
          checked>
        </input-checkbox>
      </td>
      <td>
        <span id="checkbox-example-tooltip-4">
          Checkbox with label and <code>disabled</code> & <code>checked</code> attributes
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <input-checkbox
          id="checkbox-example-5"
          size="25px"
          icon-on="./sprite.svg#custom_on"
          icon-off="./sprite.svg#custom_off">
        </input-checkbox>
      </td>
      <td>
        <span id="checkbox-example-tooltip-5">
          Custom SVG Checkbox
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
| `id` | *string* | Adds `id` attribute <span class="req">required</span> |  |
| `name` | *string* | Adds `name` attribute |  |
| `disabled` | *boolean* | Adds `disabled` attribute | `false` |
| `checked` | *boolean* | Adds `checked` attribute | `false` |
| `size` | *string* | Changes the `width` and `height` of the icon | `18px` |
| `icon-on` | *string* | Add a custom SVG icon `on` state |  |
| `icon-off` | *string* | Add a custom SVG icon for the `off` state |  |
| `color` | *string* | Changes the color of the icon | `var(--primary)` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `addIcon(state, fn)` | Add a custom SVG as the icon for the given state Where the `state` parameter is either `on` or `off` and the `fn` parameter is a function that returns your SVG's xml. The function will receive the color prop as an argument. |
