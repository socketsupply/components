# Tooltip

The `Tooltip` component creates a dynamically positioned pop-up tooltip filled with custom content that shows during the `hover` state of the corresponding trigger element.

## Demo

<div class="example">
  <span id="tonic-tooltip-example">
    Hover over this text
  </span>
  <tonic-tooltip for="tonic-tooltip-example">
    <img src="./tonic.svg" width="100px">
  </tonic-tooltip>
</div>

## Code

The element that will be used to trigger the display of the tooltip must contain an `id` that matches the `for` attribute on the `tonic-tooltip` element.

#### HTML
```html
<span id="tonic-tooltip-example">Hover over this text</span>

<tonic-tooltip for="tonic-tooltip-example">
  <img src="./tonic.svg" width="100px">
</tonic-tooltip>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `for` | *string* | Adds a `for` attribute. <span class="req">required</span> |  |
| `width` | *string* | Changes the `width` style. |  |
| `height` | *string* | Changes `height` style. |  |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the tooltip. |
| `hide()` | Hides the tooltip. |
