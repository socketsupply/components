# ContentTooltip

The `ContentTooltip` component creates a dynamically positioned pop-up tooltip filled with custom content that shows during the `hover` state of the corresponding trigger element.

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
        <span id="content-tooltip-example-1">Hover me!</span>
      </td>
      <td>
        <span id="content-tooltip-tooltip-1">
          Default content box
        </span>
      </td>
    </tr>
  </tbody>
</table>

%html%

## Code

The trigger element must contain an `id` that corresponds to the `for` element on the `content-tooltip` element.

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `for` | *string* | Adds a `for` attribute <span class="req">required</span> |  |
| `width` | *string* | Changes the `width` style |  |
| `height` | *string* | Changes `height` style |  |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the tooltip |
| `hide()` | Hides the tooltip |
