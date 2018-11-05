# ProfileImage
The `ProfileImage` component is used to create an SVG icon with a custom size and color.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-profile-image
      id="profile-image-example-editable"
      size="150px"
      editable="true">
    </tonic-profile-image>
  </div>
</div>

## Code

#### HTML
```html
%html%
```

#### JS
```js
%js%
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the `id` attribute. | |
| `name` | *string* | Adds the `name` attribute. | |
| `src` | *string* | Add an image source. | |
| `size` | *string* | Changes the width and height of the image. | `25px` |
| `radius` | *string* | Change the border-radius of the image. | `5px` |
| `border` | *string* | Change the border of the image (i.e. '1px solid white'). |  |
| `editable` | *boolean* | Add an edit overlay. | `false` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Events
| Name | Description |
| :--- | :--- |
| `change` | Emitted when the `src` changes. |
| `error` | Emitted when there was a problem reading the provided input. |
