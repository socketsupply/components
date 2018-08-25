# 3. Styling

Components should ship with as little CSS as possible and try to inherit
whenever possible from the document's stylesheets. Tonic supports two approaches
to styling components.

### Approach 1. Dynamic Stylesheets
The value returned from the `stylesheet()` function will be attached to a style
element in the head of the document if and when the component is used (lazily).
Since the value is css, you can use any `css-in-js` library you want and it will
be easy to inspect and override from another stylesheet.

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

Any classes you add should be prefixed so that they don't collide with any class
names which already exist in the document's stylesheet. We use this convention...

```js
library--component-name--class-name
```

### Approach 2. Inline styles

Sometimes you want to use inline-styles. If your component has a `styles()`
method that returns an object and the `styles="..."` attribute is found on an
html tag, Tonic will try to apply the matching style properties when the
`render()` method is called. Note that the styles are applied through Javascript
in a CSP-friendly way.

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
