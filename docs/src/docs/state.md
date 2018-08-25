# 5. State

Props are received by the parent and should never be changed by the component
that receives them. A component can however change its `state`. Each instance of
a component has state object, `this.state`. This is just a plain-old javascript
object. `this.setState()` can receive a value or a function.

```js
// Update a component's state
this.setState(state => ({
  ...state,
  color: 'red'
}))

// Reset a component's state
this.setState({ color: 'red' })
```

---

`.setState()` will not cause a component to re-render. The reasoning behind this
is that the `state` can be updated independently, as needed &mdash; rendering
happens only when changes to the representation of the component are required.

