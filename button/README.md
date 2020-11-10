# Button

A `Button` component with a built-in loading state.

## Demo

<div class="example">
  <tonic-button
    async="true"
    id="tonic-button-example-1"
    class="tonic-button-example"
    value="click-me">Click me</tonic-button>
  <tonic-button
    async="true"
    class="danger tonic-button-example"
    id="tonic-button-example-2"
    value="click-me">Click me</tonic-button>
  <tonic-button
    async="true"
    class="outline tonic-button-example"
    id="tonic-button-example-3"
    value="click-me">Click me</tonic-button>
  <tonic-button
    type="icon"
    class="tonic-button-example"
    id="tonic-button-example-4"
    fill="var(--tonic-primary)"
    symbol-id="edit"
    size="22px"
    value="click-me"></tonic-button>
</div>

## Code

#### HTML
```html
<tonic-button
  async="true"
  id="tonic-button-example"
  value="click-me">Click me
</tonic-button>
```

### CSS
An example of how to modify a button with a specific class.

```css
tonic-button.danger {
  --tonic-button-text: rgba(255, 255, 255, 1);
  --tonic-button-background: rgba(240, 102, 83, 1);
  --tonic-button-background-hover: rgba(250, 112, 93, 1);
  --tonic-button-background-focus: rgba(245, 106, 88, 1);
}
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Button with `id` attribute. | |
| `name` | *string* | Button with a `name` attribute. | |
| `type` | *string* | Type of button (i.e. submit). | |
| `value` | *string* | Value of the button. | `Submit` |
| `disabled` | *boolean* | Button with the `disabled` attribute. | `false` |
| `autofocus` | *boolean* | Button with the `autofocus` attribute. | `false` |
| `async` | *boolean* | Make button asynchronous. | `false` |
| `is-active` | *boolean* | Active button. | `false` |
| `width` | *string* | Width of the button. | `150px` |
| `height` | *string* | Height of the button. | `38px` |
| `radius` | *string* | Radius of the button. | `2px` |
| `background-color` | *string* | Button background color. |  |
| `text-color` | *string* | TextColor of the button. |  |
| `href` | *string* | Add a location (url) for click event. | |
| `target` | *string* | If you specify target, it will open an href in a new window, unless target is `_self` | `_self` |
| `tabindex` | *number* | Add a `tabindex` for the button. | |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |
| `symbol-id` | *string* | When `type=icon`, this id will be used to refer to the svg symbol. | |
| `sizse` | *string* | When `type=icon`, this id will be used as the size of the icon. | |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `click()` | Click event |
| `loading(state)` | Removes loading from an async button. |
