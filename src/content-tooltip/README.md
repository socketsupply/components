# ContentTooltip

The `ContentTooltip` component creates a dynamically positioned pop-up tooltip filled with custom content that shows during the `hover` state of the corresponding trigger element.

## Demo

%html%

<style nonce="%nonce%">
  #content-tooltip-example-1 {
    cursor: default;
  }
</style>

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <span id="content-tooltip-example">
      Hover over this text
    </span>
  </div>
</div>

## Code

The element that will be used to trigger the display of the tooltip must contain an `id` that matches the `for` attribute on the `content-tooltip` element.

#### HTML
```html
<span id="content-tooltip-example">Hover over this text</span>

%html%
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
