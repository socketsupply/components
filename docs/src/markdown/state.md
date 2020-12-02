# State

`this.state` is just a plain-old javascript object that will persist across
re-renders.

```js
//
// Update a component's state
//
this.state.color = 'red'

//
// Reset a component's state
//
this.state = { color: 'red' }
```

A component that uses state requires an `id` property.

```html
<my-app id="my-app"></my-app>
<!-- always set a unique ID if you have multiple elems. -->
<my-downloader id="download-chrome" app="chrome"></my-downloader>
<my-downloader id="download-firefox" app="firefox"></my-downloader>
```

---

Setting state will not cause a component to re-render. This way you can
make incremental updates. Components can be updated independently. And
rendering only happens only when necessary.
