# ContentPanel
The component `ContentPanel` create a content panel with an optional overlay.

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
      <td>
        <content-panel id="content-panel-example-1"></content-panel>
        <input-button id="content-panel-link-example-1" value="Click to open"></input-button>
      </td>
      <td>
        <span id="content-panel-tooltip-1">
          Default Content Panel (right)
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <content-panel id="content-panel-example-2" position="left"></content-panel>
        <input-button id="content-panel-link-example-2" value="Click to open"></input-button>
      </td>
      <td>
        <span id="content-panel-tooltip-2">
          Default Content Panel (left)
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <content-panel id="content-panel-example-3" overlay="true"></content-panel>
        <input-button id="content-panel-link-example-3" value="Click to open"></input-button>
      </td>
      <td>
        <span id="content-panel-tooltip-3">
          Default Content Panel with overlay (right)
        </span>
      </td>
    </tr>
  </tbody>
</table>

%html%

%js%

## Code

A template is required. Example template structure for panel content:

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
| `id` | *string* | Adds the `id` attribute | |
| `name` | *string* | Adds the `name` attribute | |
| `position` | *string* | Changes the position of the panel | `right` |
| `overlay` | *boolean* | Shows an overlay behind the panel, blocks page interaction | `false` |
| `background-color` | *string* | Changes the background color of the overlay | `rgba(0,0,0,0.5)` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the panel |
| `hide()` | Hides the panel |
| `click()` | Click event |
