# Styling

Tonic supports multiple approaches to safely styling components.

### Option 1. Inline styles

Inline styles are a security risk. Tonic provides the `styles()` method so you
can inline styles safely. Tonic will apply the style properties when the `render()`
method is called.

```js
class MyGreeting extends Tonic {
  styles () {
    return {
      a: {
        color: this.props.fg,
        fontSize: '30px'
      },
      b: {
        backgroundColor: this.props.bg,
        padding: '10px'
      }
    }
  }

  render () {
    return `<div styles="a b">${this.children}</div>`
  }
}
```

```xml
<my-greeting fg="white" bg="red">Hello, World</my-greeting>
```

### Option 2. Dynamic Stylesheets
The `stylesheet()` method will add a styleaheet to your compoonent.

```js
class MyGreeting extends Tonic {
  stylesheet () {
    return `
      my-greeting div {
        display: ${this.props.display};
      }
    `
  }

  render () {
    return `<div></div>`
  }
}
```

### Option 3. Static Stylesheets
The static `stylesheet()` method will add a styleaheet to the document,
but only once.

```js
class MyGreeting extends Tonic {
  static stylesheet () {
    return `
      my-greeting div {
        border: 1px dotted #666;
      }
    `
  }

  render () {
    return `<div></div>`
  }
}
```
