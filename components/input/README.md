# InputText

Any valid input HTML attribute can be passed to the `InputText` component.

## Demo

<input-text label="Default"></input-text>

<input-text
  label="Default with Placeholder"
  placeholder="Type something"
  disabled>
</input-text>

<input-text
  label="Invalid"
  aria-invalid="true">
</input-text>

<input-text
  label="Full width"
  width="100%">
</input-text>

## Code

### Html
```html
<input-text spellcheck></input-text>
```

### JS
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
| `placeholder` | *string* | Inserts placeholder text | *none* |
| `width` | *string* | Width of the input | *"300"* |
| `type` | *string* | Type of input (text, password, email) | *"text"* |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| methodName() | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| methodName() | Description |
