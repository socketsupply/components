# Component Styling

Any styles returned from your component will be attached to a style element in
the head.

It is important to prefix your styles with the name of the component to ensure the proper scope. Otherwise, the styles may apply to other parts of the page where the component is used.

```js
class MyGreeting extends Tonic {
  style () {
    return `
      my-greeting div {
        display: inline-block;
        border: 1px dotted #666;
        height: 100px;
        width: 100px;
        line-height: 90px;
      }
    `
  }

  render () {
    return `<div></div>`
  }
}
```
