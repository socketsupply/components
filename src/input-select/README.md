# InputSelect

The component `InputSelect` creates an select input.

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
        <input-select label="Type of Bird" id="options-example-1">
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
        <span id="select-example-tooltip-1">Default select with label (using <code>change</code> event)</span>
      </td>
    </tr>
  </tbody>
</table>

## Code

#### HTML

```html
<input-select>
  <option value="a">Option A</option>
  <option value="b">Option B</option>
  <option value="c">Option C</option>
</input-select>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Select box with `id` attribute | |
| `name` | *string* | Select box with `name` attribute | |
| `required` | *boolean* | Makes the select box required | `false` |
| `disabled` | *boolean* | Makes the select box disabled | `false` |
| `label` | *string* | Adds a label to the select box | |
| `width` | *string* | Width of the select box | `250px` |
| `height` | *string* | Height of the select box | |
| `radius` | *string* | Radius of the select box | `2px` |
| `value` | *string* | The default value that will be selected | |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `change()` | The native `change` event on the select input. |
| `option` | A `getter` that provides the currently selected option from the select input inside the component. |
| `value` | A `getter` that provides the current value of the select input from inside of the component. |
| `selectedIndex` | A `getter` that provides the selected index of the select input inside the component. |
