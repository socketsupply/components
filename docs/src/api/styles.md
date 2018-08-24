# 1. Styling

Components should ship with as little CSS as possible and try to inherit
whenever possible from the document's stylesheets.

Any classes you add should be prefixed so that they don't collide with any class
names which already exist in the document's stylesheet. We use this convention...

```js
library--component-name--class-name
```

The text returned from the `stylesheet()` function will be attached to a style
element in the head of the document. So you can use any `css-in-js` library you
want. Since the result is plain-old-css, it's easy to inspect and override from
another stylesheet.

```js
class MyGreeting extends Tonic {
  stylesheet () {
    return `

      my-greeting div {
        display: inline-block;
        border: 1px dotted #666;
        line-height: 90px;
      }

      my-greeting .tonic--my-greeting--show {
        display: flex;
      }
    `
  }

  render () {
    return `<div></div>`
  }
}
```

Sometimes you don't want to create classes at all. Sometimes you want to use
inline-styles for your component. Tonic supports that too. Inline styles are
added after the `render()` method is called.

```js
class MyGreeting extends Tonic {
  styles () {
    return {
      fontStyle: {
        color: this.props.fg,
        fontSize: '30px'
      },
      background: {
        backgroundColor: this.props.bg,
        padding: '10px'
      }
    }
  }

  render () {
    return `<div styles="fontStyle background">${this.children}</div>`
  }
}
```

```xml
<my-greeting fg="white" bg="red">Hello, World</my-greeting>
```
