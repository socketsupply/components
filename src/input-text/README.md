# InputText

The component `InputText` creates an input, with or without a label.

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
      <td><input-text></input-text></td>
      <td>
        <span id="input-example-tooltip-1">
          Default input (without label)
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <input-text label="label">
        </input-text>
      </td>
      <td>
        <span id="input-example-tooltip-2">
          Input with label
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <input-text
          src="./sprite.svg#example"
          position="left"
          label="Input with Icon">
        </input-text>
      </td>
      <td>
        <span id="input-example-tooltip-3">
          Input with label and icon (left)
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <input-text
          src="./sprite.svg#example"
          position="right"
          label="Input with Icon">
        </input-text>
      </td>
      <td>
        <span id="input-example-tooltip-4">
          Input with label and icon (right)
        </span>
      </td>
    </tr>
    <tr>
      <td><input-text label="Disabled Input" disabled></input-text></td>
      <td>
        <span id="input-example-tooltip-5">
          Input with label and <code>disabled</code> attribute
        </span>
      </td>
    </tr>
    <tr>
      <td><input-text label="Input with Placeholder" placeholder="Type something"></input-text></td>
      <td>
        <span id="input-example-tooltip-6">
          Input with label & placeholder
        </span>
      </td>
    </tr>
    <tr>
      <td><input-text label="Input with Value" value="Value"></input-text></td>
      <td>
        <span id="input-example-tooltip-7">
          Input with label & value
        </span>
      </td>
    </tr>
    <tr>
      <td><input-text width="100%" label="Full Width"></input-text></td>
      <td>
        <span id="input-example-tooltip-8">
          Full width with label
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
| `id` | *string* | Input with `id` attribute | |
| `name` | *string* | Input with `name` attribute | |
| `type` | *string* | Type of input (text, password, email) | `text` |
| `required` | *boolean* | Makes the input `required` | `false` |
| `disabled` | *boolean* | Makes the input `disabled` | `false` |
| `spellcheck` | *boolean* | Enable `spellcheck` on the input | `false` |
| `invalid` | *boolean* | Adds the `invalid` attribute | `false` |
| `aria-invalid` | *boolean* | Adds `aria-invalid` attribute | `false` |
| `placeholder` | *string* | Inserts `placeholder` text | |
| `label` | *string* | Adds a label to the input | |
| `src` | *string* | Adds an icon to the input | |
| `position` | *string* | The position of an icon, if specified | |
| `pattern` | *string* | Regex for checking value | |
| `width` | *string* | Width of the input | `250px` |
| `radius` | *string* | Radius of the input | `3px` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |
