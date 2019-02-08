# Dialog
A `Dialog` is not a component, it is a base class. You can extend it to create your own dialog class which can be registered and then used as a tag.

## Demo

<tonic-dialog id="example-dialog" message="Click update for timestamp">
</tonic-dialog>

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-button
      id="example-dialog-link">
      Click To Open
    </tonic-button>
  </div>
</div>

## Code

#### HTML
```html
<tonic-dialog id="example-dialog" message="Click update for timestamp">
</tonic-dialog>
```

#### JS
```js
%js%
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute. |  |
| `name` | *string* | Adds a `name` attribute. |  |
| `width` | *string* | Sets the width of the dialog. |  |
| `height` | *string* | Sets the height of the dialog. |  |
| `overlay` | *string* | Adds a background overlay. | `true` |
| `background-color` | *string* | Sets the background color of the overlay. | `rgba(0,0,0,0.5)` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the dialog. Returns a promise that can be awaited while the animation finishes. |
| `hide()` | Hides the dialog. Returns a promise that can be awaited while the animation finishes. |
| `click()` | Click event. |
