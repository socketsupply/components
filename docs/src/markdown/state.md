# State

`this.state` is just a plain-old javascript object that will persist across
re-renders.

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
