# ContentDialog
The component `ContentDialog` is used to create a dialog that displays content on top of an overlay.

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
      <td>
        <content-dialog id="content-dialog-example-1"></content-dialog>
        <input-button name="buttonCancel" id="content-dialog-link-example-1" value="Click to open"></input-button>
      </td>
      <td>Default dialog box</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <content-dialog id="content-dialog-example-2" overlay="false"></content-dialog>
        <input-button name="buttonCancel" id="content-dialog-link-example-2" value="Click to open"></input-button>
      </td>
      <td>Dialog box without overlay (also resets its content).</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <content-dialog id="content-dialog-example-3" overlay="true" background-color="rgba(75, 145, 221, 0.5)"></content-dialog>
        <input-button name="buttonCancel" id="content-dialog-link-example-3" value="Click to open"></input-button>
      </td>
      <td>Dialog box with overlay and custom background color</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
  </tbody>
</table>

%html%

%js%

## Code

A template is required. Example template structure for dialog content:

```html
  <template for= id>
    <header>
      <!-- Header content goes here -->
    </header>
    <main>
      <!-- Main content goes here -->
    </main>
    <footer>
      <!-- Footer content goes here -->
    </footer>
  </template>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute |  |
| `name` | *string* | Adds a `name` attribute |  |
| `width` | *string* | Sets the width of the dialog |  |
| `height` | *string* | Sets the height of the dialog |  |
| `overlay` | *string* | Adds a background overlay | `true` |
| `backgroundColor` | *string* | Sets the background color of the overlay | `rgba(0,0,0,0.5)` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
