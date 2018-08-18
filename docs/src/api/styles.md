# 1. Styling

Your component's styles will be attached to a style element in the head of the
document. You can use any [css-in-js][0] library, or something like [postcss][1]
as long as it outputs CSS.

Though it is our opinion is that components should ship with as little CSS as
possible and try to inherit whenever possible from the document's stylesheets.

It is important to prefix your styles with the name of the component to ensure
the proper scope. Otherwise, the styles may apply to other parts of the page
where the component is used.

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

[0]:https://github.com/MicheleBertoli/css-in-js
[1]:https://postcss.org/
