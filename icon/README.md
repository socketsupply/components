# Icon
The `Icon` component is used to create an SVG icon with a custom size and color.

Your single SVG sprite file should have the following base structure, using `<symbol>` and an `id` to refer to the specific icon:

```
<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
  <symbol id="example">
    <path />
  </symbol>
</svg>
```

## Demo

<div class="example">
  <tonic-icon
    symbol-id="example"
    src="/sprite.svg"
    fill="red"
    size="40px"></tonic-icon>
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
| `fill` | *string* | Changes the color of the icon. | `var(--tonic-primary)` |
| `src` | *string* | Optional, a custom file to use as the the source. | `./sprite.svg` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |
