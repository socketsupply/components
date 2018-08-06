# InputText

The component `InputText` creates an input, with or without a label.

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
      <td><input-text></input-text></td>
      <td>Default input (without label)</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <input-text label="label">
        </input-text>
      </td>
      <td>Input with label</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
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
      <td>Input with label and icon (left)</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
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
      <td>Input with label and icon (right)</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-text label="Disabled Input" disabled></input-text></td>
      <td>Input with label and <code>disabled</code> attribute</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-text label="Input with Placeholder" placeholder="Type something"></input-text></td>
      <td>Input with label & placeholder</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-text label="Input with Value" value="Value"></input-text></td>
      <td>Input with label & value</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-text width="100%" label="Full Width"></input-text></td>
      <td>Full width with label</td>
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
| `id` | *string* | Input with `id` attribute | |
| `name` | *string* | Input with `name` attribute | |
| `type` | *string* | Type of input (text, password, email) | `text` |
| `required` | *boolean* | Makes the input required | `false` |
| `disabled` | *boolean* | Makes the input disabled | `false` |
| `spellcheck` | *boolean* | Enable spellcheck on the input | `false` |
| `isinvalid` | *boolean* | Indicates input error | `false` |
| `placeholder` | *string* | Inserts placeholder text | `none` |
| `width` | *string* | Width of the input | `250px` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
