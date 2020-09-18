# Panel
Similar to dialog, just a wrapper with hide and show.

> *__Note:__ This component requires the `tonic-sprite` component.*

## Demo
<tonic-panel
  width="50%"
  width-mobile="100%"
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
| `position` | *string* | Changes the position of the panel (`left` or `right`). | `right` |
| `width` | *string* | Width of the panel. | |
| `width-mobile` | *string* | Width of the panel on mobile. | |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the panel. |
| `hide()` | Hides the panel. |
