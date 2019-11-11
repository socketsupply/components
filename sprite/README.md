# Sprite

The `Sprite` component produces an inline svg that contains symbols
which can be referred to by other components.

You should include the `tonic-sprite` once, somewhere in the body, but before
other components that use it.

#### HTML
```html
<tonic-sprite></tonic-sprite>
```

---

To use a symbol from another component, you can refer to the symbol by its `id`
property, for example...

#### JS
```js
class MyComponent extends Tonic {
  render () {
    return this.html`
      <tonic-icon symbol-id="close" size="40px"></tonic-icon>
    `
  }
}
```
