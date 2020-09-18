# Panel
Similar to dialog, just a wrapper with hide and show.

> *__Note:__ This component requires the `tonic-sprite` component.*

## Demo
<tonic-panel
  width="50%"
  id="tonic-panel-example">
  <read-wikipedia
    id="content-panel-example">
  </read-wikipedia>
<tonic-panel>

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-button id="content-panel-link-example">
      Click to open
    </tonic-button>
  </div>
</div>

## Code

#### HTML
```html
<tonic-panel
  id="content-panel-example"
  overlay="true">
</tonic-panel>
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
| `position` | *string* | Changes the position of the panel (`left` or `right`). | `right` |
| `overlay` | *boolean* | Shows an overlay behind the panel, blocks page interaction. | `false` |
| `background-color` | *string* | Changes the background color of the overlay. | `rgba(0,0,0,0.5)` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the panel. |
| `hide()` | Hides the panel. |
