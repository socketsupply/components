# State

Props are received by the parent and should never be changed by the component
that receives them. A component can change its `state`. Each instance of a
component has state object, `this.state`. This is just a plain-old javascript
object.

```js
// Update a component's state
this.state = {
  ...this.state,
  color: 'red'
}))

// Reset a component's state
this.state = { color: 'red' }
```

---

Setting state will not cause a component to re-render. This way you can
make incremental updates. Components can be updated independently. And
rendering only happens only when necessary.
