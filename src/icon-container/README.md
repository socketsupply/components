# IconContainer
The component `IconContainer` is used to create an SVG icon with a custom size and color.

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
      <td><icon-container></icon-container></td>
      <td>Default Icon (25px)</td>
      <td>
        <content-tooltip id="icon-container-example-1">
          <icon-container src="./sprite.svg#code">
          </icon-container>
        </content-tooltip>
      </td>
    </tr>
    <tr>
      <td><icon-container color="#f06653"></icon-container></td>
      <td>Icon with color (25px)</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><icon-container size="60px"></icon-container></td>
      <td>Large Icon (60px)</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <icon-container size="60px" src="./sprite.svg#custom">
        </icon-container>
      </td>
      <td>Custom Icon (60px)</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
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

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
