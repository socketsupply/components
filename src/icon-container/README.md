# IconContainer
The component `IconContainer` is used to create an SVG icon with a custom size and color.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <icon-container size="40px"></icon-container>
  </div>
</div>

## Code

#### HTML
```html
<icon-container size="40px"></icon-container>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `size` | *string* | Changes the width and height of the icon | `25px` |
| `color` | *string* | Changes the color of the icon | `#000` |
| `src` | *string* | Allow a custom icon from a sprite | `./sprite.svg#example` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |
