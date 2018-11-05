# Panel
A `Panel` is not a component, it is a base class. You can extend it to create
your own panel class which can be registered and then used as a tag.

## Demo

%html%

<style nonce="%nonce%">
  tonic-panel h3 {
    margin: 0;
  }

  tonic-panel header {
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
  }

  tonic-panel main {
    padding: 20px;
    position: absolute;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 70px;
    overflow: scroll;
  }

  tonic-panel footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 70px;
    padding: 10px;
    text-align: center;
    border-top: 1px solid var(--border);
  }
</style>

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-button
      id="content-panel-link-example">
      Click to open
    </tonic-button>
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
