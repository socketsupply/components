# Panel
A `Panel` is not a component, it is a base class. You can extend it to create
your own panel class which can be registered and then used as a tag.

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
          id="content-panel-link-example">
          Click to open
        </input-button>
      </td>
      <td>
        <span id="content-panel-tooltip-1">
          Default Content Panel with overlay (right)
        </span>
      </td>
    </tr>
  </tbody>
</table>

%html%

<style>
  my-panel h3 {
    margin: 0;
  }
</style>

## Code

```js
%js%
```

```html
%html%
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the `id` attribute. | |
| `name` | *string* | Adds the `name` attribute. | |
| `position` | *string* | Changes the position of the panel. | `right` |
| `overlay` | *boolean* | Shows an overlay behind the panel, blocks page interaction. | `false` |
| `background-color` | *string* | Changes the background color of the overlay. | `rgba(0,0,0,0.5)` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the panel. |
| `hide()` | Hides the panel. |
| `click()` | Click event. |
