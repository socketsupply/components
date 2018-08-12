# Dialog
`Dialog` is not a component, it is a base class. You can extend it to create
your own dialog class which can be registered and then used as a tag.

## Demo

<table class="example">
  <thead>
    <tr>
      <th>Example</th>
      <th>Description &amp; Code</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <input-button
          id="example-dialog-link">
          Click To Open
        </input-button>
      </td>
      <td>
        <span id="content-dialog-tooltip-1">Default dialog box</span>
      </td>
    </tr>
  </tbody>
</table>

%html%

## Code

```
%js%
```

```
%html%
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute |  |
| `name` | *string* | Adds a `name` attribute |  |
| `width` | *string* | Sets the width of the dialog |  |
| `height` | *string* | Sets the height of the dialog |  |
| `overlay` | *string* | Adds a background overlay | `true` |
| `background-color` | *string* | Sets the background color of the overlay | `rgba(0,0,0,0.5)` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the dialog |
| `hide()` | Hides the dialog |
| `click()` | Click event |
