# Icon
The `Icon` component is used to create an SVG icon with a custom size and color.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-icon
      symbol-id="example"
      src="/sprite.svg"
      fill="red"
      size="40px"></tonic-icon>
  </div>
</div>

## Code

#### HTML
```html
<tonic-icon
  symbol-id="example"
  src="/sprite.svg"
  fill="red"
  size="40px">
</tonic-icon>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `size` | *string* | Changes the width and height of the icon. | `25px` |
| `fill` | *string* | Changes the color of the icon. | `var(--primary)` |
| `src` | *string* | Allow a custom icon from a sprite. | `./sprite.svg` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |
