# ProfileImage
The component `ProfileImage` is used to create an SVG icon with a custom size and color.

## Demo

<table class="example">
  <thead>
    <tr>
      <th>Example</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><profile-image size="18px"></profile-image></td>
      <td>
        <span id="profile-image-tooltip-1">
          Small Profile Image (18px)
        </span>
      </td>
    </tr>
    <tr>
      <td><profile-image></profile-image></td>
      <td>
        <span id="profile-image-tooltip-2">
          Default Profile Image (25px)
        </span>
      </td>
    </tr>
    <tr>
      <td><profile-image size="75px" radius="100%"></profile-image></td>
      <td>
        <span id="profile-image-tooltip-3">
          Profile Image with Radius (75px)
        </span>
      </td>
    </tr>
    <tr>
      <td><profile-image size="150px"></profile-image></td>
      <td>
        <span id="profile-image-tooltip-4">
          Large Profile Image (150px)
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <profile-image
          id="profile-image-example-editable"
          size="150px"
          editable>
        </profile-image>
      </td>
      <td>
        <span id="profile-image-tooltip-5">
          Large Editable Profile Image (150px)
        </span>
      </td>
    </tr>
  </tbody>
</table>

%html%

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
| `changed` | Emitted when the `src` changes. |
| `error` | Emitted when there was a problem reading the provided input. |
