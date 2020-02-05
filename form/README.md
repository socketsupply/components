# Form

The `Form` component is a container that can collect the values of its child
elements. There is no `submit` or validate functions, listening for an event on
which to get the value and use it are responsibilies of the parent component.

Key names use a special `dot notation` to determine what the value on the form
will be.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-form id="f">
      <tonic-input data-key="ka" id="a" value="va"></tonic-input>
      <tonic-input data-key="foo.kb" id="b" value="vb"></tonic-input>
      <tonic-input id="c" value="vc"></tonic-input>
      <tonic-input data-key="bar.0.buzz" id="d" value="vd"></tonic-input>
    </tonic-form>
  </div>
</div>

## Code

#### HTML

```html
<tonic-form id="f">
  <tonic-input data-key="ka" id="a" value="va"></tonic-input>
  <tonic-input data-key="foo.kb" id="b" value="vb"></tonic-input>
  <tonic-input id="c" value="vc"></tonic-input>
  <tonic-input data-key="bar.0.buzz" id="d" value="vd"></tonic-input>
</tonic-form>
```

---

#### JS

```js
const form = document.getElementById('f')
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

### Instance Members

| Property | Description |
| :--- | :--- |
| `value` | Getter/setter for the value of the form. |
