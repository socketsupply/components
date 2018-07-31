# InputCheckbox

`InputCheckbox` is used to create a styled checkbox, with or without a label. You can also create a custom checkbox using SVG icons.

## Demo

| Example | Description |
| :--- | :--- |
| <input-checkbox id="input-checkbox-example"></input-checkbox> | Default Checkbox |
| <input-checkbox id="input-checkbox-example-2" label="Label"></input-checkbox> | Checkbox with label |
| <input-checkbox id="input-checkbox-example-3" label="Disabled" disabled></input-checkbox> | Checkbox with label and `disabled` attribute |
| <input-checkbox id="input-checkbox-example-4" label="Disabled and Checked" disabled checked></input-checkbox> | Checkbox with label and `disabled` & `checked` attributes |
| <input-checkbox id="input-checkbox-example-5"></input-checkbox> | Custom SVG Checkbox |

## Code

#### HTML

```html
<input-checkbox>
</input-checkbox>
```
#### js

```js

```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `checked` | *boolean* | Changes the color of the icon | *#000* |
| `size` | *string* | Changes the width and height of the icon | *30px* |
| `color` | *string* | Changes the color of the icon | *#36393d* |
| `id` | *string* | Changes the color of the icon | *none* |
| `name` | *string* | Changes the color of the icon | *none* |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `addIcon(state, fn)` | Add a custom SVG as the icon for the given state Where the `state` parameter is either `on` or `off` and the `fn` parameter is a function that returns your SVG's xml. The function will receive the color prop as an argument. |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
