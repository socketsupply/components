# State and Properties

## Passing data to your components

Add components to your HTML, pass them arguments just like with regular HTML.

```js
<my-component value="7a"></my-component>
```

Native HTML only understands strings. If you want to pass non-string props (like
some json) you need to stringify it. If you surround your property value with
curly braces `{...}`, the value will be parsed as JSON. But you should not
pass complex objects like functions though your HTML. Keep that in your JS!

```html
<parent-component id="parent" data={[1,2,3]}></parent-component>
```

Alternatively, you can call the `reRender(...)` method on the element directly.
This is a better way to pass data if you have larger data it wont need to first
pass though the HTML.

```js
document.getElementById('parent').reRender({ data: [1,2,3, ...9999] })
```

## Managing state and props

`.reRender()` and `.setState()` can receive either an object or a function as an
argument. For example...

```js
//
// Update a component's properties
//
myComponent.reRender(props => ({
  ...props,
  color: 'red'
}))
```

```js
//
// Reset a component's properties
//
myComponent.reRender({ color: 'red' })
```

```js
//
// Re-render a component with its existing properties
//
myComponent.reRender()
```

The value received by `.reRender()` should represent the properties of the
component (those properties should generally be considered immutable and
provided by the top-most parent component).

`.setState()` receives a value that describes the state of the component, under
the hood this is a plain old javascript object. It's values may be used by the
component's render function.

`.setState()` will not cause a re-render. The reasoning behind this is that
`state` can be updated independently, as needed and rendering happens only when
changes to the representation of the component are required.
