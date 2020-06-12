# Styling

Components should ship with as little CSS as possible and try to inherit
whenever possible from the document's stylesheets. Tonic supports two approaches
to styling components.

### Approach 1. Inline styles

It is a security risk to add inline styles from html. A CSP policy will usually
prevent this. Use the `styles()` method to inline styles safely. Tonic will
apply the style properties when the `render()` method is called.

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

### Approach 2. Dynamic Stylesheets
Use the `stylesheet()` function to inline a stylesheet into the document where
the component is rendered. Since the value is css, you can use any `css-in-js`
library.

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
