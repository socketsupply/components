# InputSelect

The component `InputSelect` creates an select input, with or without a label.

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
        <input-select id="options-example-1">
          <option value="option-a">Option A</option>
          <option value="option-b">Option B</option>
          <option value="option-c">Option C</option>
        </input-select>
      </td>
      <td>
        <span id="select-example-tooltip-1">Default select (using <code>change</code> event)</span>
      </td>
    </tr>
    <tr>
      <td>
        <input-select id="options-example-2">
          <option value="none" selected disabled>Select One</option>
          <optgroup label="Aerial Birds">
            <option value="sparrow">Sparrow</option>
            <option value="dove">Dove</option>
            <option value="crow">Crow</option>
          </optgroup>
          <optgroup label="Water Birds">
            <option value="duck">Duck</option>
            <option value="swan">Swan</option>
          </optgroup>
        </input-select>
      </td>
      <td>
        <span id="select-example-tooltip-2">
          Select with <code>optgroup</code>
        </span>
      </td>
    </tr>
  </tbody>
</table>

%html%

%js%

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Input with `id` attribute | |
| `name` | *string* | Input with `name` attribute | |
| `required` | *boolean* | Makes the input required | `false` |
| `disabled` | *boolean* | Makes the input disabled | `false` |
| `width` | *string* | Width of the input | `250px` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `change()` | Bind to the `change` event |
