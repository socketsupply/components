# Panel
A `Panel` is not a component, it is a base class. You can extend it to create
your own panel class which can be registered and then used as a tag.

## Demo

%html%

<style>
  my-panel h3 {
    margin: 0;
  }
</style>

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <input-button
      id="content-panel-link-example">
      Click to open
    </input-button>
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
| `position` | *string* | Changes the position of the panel. | `right` |
| `overlay` | *boolean* | Shows an overlay behind the panel, blocks page interaction. | `false` |
| `background-color` | *string* | Changes the background color of the overlay. | `rgba(0,0,0,0.5)` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the panel. |
| `hide()` | Hides the panel. |
| `click()` | Click event. |
