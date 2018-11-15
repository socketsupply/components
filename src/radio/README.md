<!-- # Radio

The `Radio` component is used to create a styled radio button, with or without a label. You can also create a custom radio button using SVG icons.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-radio
      id="tonic-radio-example-1"
      name="tonic-radio-example"
      checked="true"
      label="Option 1">
    </tonic-radio>
    <tonic-radio
      id="tonic-radio-example-2"
      name="tonic-radio-example"
      label="Option 2">
    </tonic-radio>
    <tonic-radio
      id="tonic-radio-example-3"
      name="tonic-radio-example"
      label="Option 3">
    </tonic-radio>
  </div>
</div>

### Custom Radio

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-radio
      id="custom-radio-example"
      size="40px"
      color="red"
      checked="false"
      icon-on="./sprite.svg#custom_on"
      icon-off="./sprite.svg#custom_off">
    </tonic-radio>
  </div>
</div>

## Code

#### HTML
```html
<tonic-radio
  id="tonic-radio-example"
  label="Radio with Label">
</tonic-radio>
```

---

To create a custom SVG radio button, pass in the properties `icon-on` and `icon-off` to set  different icons for each checked state.

#### HTML

```html
<tonic-radio
  id="custom-radio-example-1"
  name="custom-radio-example"
  size="40px"
  color="red"
  icon-on="./sprite.svg#custom_on"
  icon-off="./sprite.svg#custom_off">
</tonic-radio>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds `id` attribute. <span class="req">required</span> |  |
| `name` | *string* | Adds `name` attribute. <span class="req">required</span> |  |
| `disabled` | *boolean* | Adds `disabled` attribute. | `false` |
| `checked` | *boolean* | Adds `checked` attribute. | `false` |
| `size` | *string* | Changes the `width` and `height` of the icon. | `18px` |
| `icon-on` | *string* | Add a custom SVG icon `on` state. |  |
| `icon-off` | *string* | Add a custom SVG icon for the `off` state. |  |
| `color` | *string* | Changes the color of the icon. | `--primary` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Properties

| Method | Description |
| :--- | :--- |
| `value` | A getter/setter that returns `true` if the radio is checked or `false` if the radio is not checked. |

### Static Methods

| Method | Description |
| :--- | :--- |
| `addIcon(state, fn)` | Add a custom SVG as the icon for the given state Where the `state` parameter is either `on` or `off` and the `fn` parameter is a function that returns your SVG's xml. The function will receive the color prop as an argument. | -->
