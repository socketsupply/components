# 1. Styling

Components should ship with as little CSS as possible and try to inherit
whenever possible from the document's stylesheets.

Although you want to let the user's style-sheet to handle as much of the styling
as possibke, sometimes your styles have more of a functional purpose than a
visual one. In cases like this you should prefix the classes name so it doesn't
collide with any class names that the user has defined. We use this convention...

```js
library--componentname--class
```

The css returned from the `style()` function will be attached to a style element
in the head of your document. So you can use any css-in-js library you want.
Also, since the result is plain-old-css, it's easy to inspect and override from
another stylesheet.

```js
class MyGreeting extends Tonic {
  style () {
    return `

      my-greeting div {
        display: inline-block;
        border: 1px dotted #666;
        height: ${this.props.height}px;
        width: ${this.props.width}px;
        line-height: 90px;
      }

      my-greeting .tonic--show {
        display: flex;
      }
    `
  }

  render () {
    return `<div></div>`
  }
}
```
