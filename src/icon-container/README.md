# IconContainer
The component `IconContainer` is used to create an SVG icon with a custom size and color.

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
      <td><icon-container></icon-container></td>
      <td>
        <span id="icon-container-tooltip-1">Default Icon (25px)</span>
      </td>
    </tr>
    <tr>
      <td><icon-container color="#f06653"></icon-container></td>
      <td>
        <span id="icon-container-tooltip-2">Icon with color (25px)</span>
      </td>
    </tr>
    <tr>
      <td><icon-container size="60px"></icon-container></td>
      <td>
        <span id="icon-container-tooltip-3">Large Icon (60px)</span>
      </td>
    </tr>
    <tr>
      <td>
        <icon-container size="60px" src="./sprite.svg#custom"></icon-container>
      </td>
      <td>
        <span id="icon-container-tooltip-4">Custom Icon (60px)</span>
      </td>
    </tr>
  </tbody>
</table>

%html%

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `size` | *string* | Changes the width and height of the icon | `25px` |
| `color` | *string* | Changes the color of the icon | `#000` |
| `src` | *string* | Allow a custom icon from a sprite | `./sprite.svg#example` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |
