# InputTextarea

The component `InputTextarea` creates a text area.

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
      <td><input-textarea></input-textarea></td>
      <td>Default Text area</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-textarea resize="none"></input-textarea></td>
      <td>Text area without resize</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-textarea placeholder="Type in me"></input-textarea></td>
      <td>Default Text area with placeholder</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-textarea label="Label"></input-textarea></td>
      <td>Text area with label</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td><input-textarea label="Disabled Text Area" disabled></input-textarea></td>
      <td>Text area with `disabled` attribute and label</td>
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
| `id` | *string* | Text area with `id` attribute | |
| `name` | *string* | Text area with `name` attribute | |
| `placeholder` | *string* | Add placeholder to text area |  |
| `spellcheck` | *boolean* | Enable spellcheck | `true` |
| `disabled` | *boolean* | Text area with `disabled` attribute | `false` |
| `required` | *boolean* | Set text area to `required` | `false` |
| `readonly` | *boolean* | Set text area to `readonly` | `false` |
| `autofocus` | *boolean* | Enable `autofocus` on the text area | `false` |
| `resize` | *string* | Set to `none` to disable resize | |
| `rows` | *string* | Set number of rows |  |
| `cols` | *string* | Set number of columns |  |
| `minlength` | *string* | Set minimum character length |  |
| `maxlength` | *string* | Set maximum character length |  |
| `width` | *string* | Set width of text area |  |
| `height` | *string* | Set height of text area | `100%` |
| `radius` | *string* | Set radius of text area | `2px` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
