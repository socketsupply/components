# Form

The `form` component implements `input` and `change` events that collect
the values of any child component that has the `data-key` attribute. The values
colected are stored on the `tonic-form` state and accessible from the `value`
property.

The value of `data-key` expects a `dot notation` to determine what the value
on the form will be.

## Demo

<div class="example">
  <tonic-form id="form-example">
    <tonic-input data-key="ka" required="true" id="a">
    </tonic-input>
    <tonic-select
      data-key="foo.kb"
      id="b"
      required="true"
    >
      <option value="" selected="true" disabled="true">Select One</option>
      <option value="a">a</option>
      <option value="b">b</option>
    </tonic-select>
    <tonic-input id="c" value="vc">
    </tonic-input>
    <tonic-input required="true" data-key="bar.0.buzz" id="d" value="vd">
    </tonic-input>
    <tonic-button disabled="true" id="form-submit">Submit</tonic-button>
  </tonic-form>
</div>

## Code

#### HTML

```html
<tonic-form id="form-example">
  <tonic-input data-key="ka" id="a" value="va"></tonic-input>
  <tonic-select
    data-key="foo.kb"
    id="b"
    required="true"
    value="vb"
  >
    <option value="" selected="true" disabled="true">Select One</option>
    <option value="a">a</option>
    <option value="b">b</option>
  </tonic-select>
  <tonic-input id="c" value="vc"></tonic-input>
  <tonic-input data-key="bar.0.buzz" id="d" value="vd"></tonic-input>
  <tonic-button id="form-submit">Submit</tonic-button>
</tonic-form>
```

---

#### JS

```js
const form = document.getElementById('form-example')
const expected = {
  ka: 'va',
  foo: {
    kb: 'vb'
  },
  bar: [{ buzz: 'vd' }]
}

assert(form.value === expected)
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Input with `id` attribute. <span class="req">required</span> | |

### Instance Methods

| Method | Description |
| :--- | :--- |
| `validate()` | Reset and run all validation for all components that implement setValid() and setInvalid(). |

### Instance Members

| Property | Description |
| :--- | :--- |
| `value` | Getter/setter for the value of the form. |
