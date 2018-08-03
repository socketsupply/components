# ProfileImage
The component `ProfileImage` is used to create an SVG icon with a custom size and color.

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
      <td><profile-image size="18px"></profile-image></td>
      <td>Small Profile Image (18px)</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><profile-image></profile-image></td>
      <td>Default Profile Image (25px)</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><profile-image size="75px" radius="100%"></profile-image></td>
      <td>Profile Image with Radius (75px)</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><profile-image size="150px"></profile-image></td>
      <td>Large Profile Image (150px)</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><profile-image size="150px" editable></profile-image></td>
      <td>Large Profile Image (150px)</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
  </tbody>
</table>

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the `id` attribute | |
| `name` | *string* | Adds the `name` attribute | |
| `size` | *string* | Changes the width and height of the image | *25px* |
| `src` | *string* | Add an image source | *'./default.jpg'* |
| `radius` | *string* | Change the border-radius of the image | *'5px'* |
| `border` | *string* | Change the border of the image (i.e. '1px solid white') |  |
| `editable` | *boolean* | Add an edit overlay | false |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
