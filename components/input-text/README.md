# InputText

`InputText` creates an input, with or without a label.

## Demo

| Example | Description |
| :--- | :--- |
| <input-text></input-text> | Default input (without label) |
| <input-text label="label"></input-text> | Input with label |
| <input-text label="label" placeholder="Type something"></input-text> | Input with label & placeholder |
| <input-text width="100%" label="Full Width"></input-text> | Full width with label |

## Code

#### Html
```html
<input-text spellcheck></input-text>
```

#### JS
```js
console.log('dog')
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `required` | *boolean* | Makes the input required | *false* |
| `disabled` | *boolean* | Makes the input disabled | *false* |
| `spellcheck` | *boolean* | Enable spellcheck on the input | *false* |
| `isinvalid` | *boolean* | Indicates input error | *false* |
| `type` | *string* | Type of input (text, password, email) | *"text"* |
| `placeholder` | *string* | Inserts placeholder text | *none* |
| `width` | *number* | Width of the input | *300* |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
