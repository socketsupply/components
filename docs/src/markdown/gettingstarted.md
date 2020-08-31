# Getting Started

Building a component with Tonic starts by creating a [Javascript Class][0].
The class should have at least one method named *render* which usually returns HTML.

```js
class MyGreeting extends Tonic {
  //
  // The render function can return a template-literal of HTML,
  // it can also include other components.
  //
  render () {
    return this.html`<div>Hello, World.</div>`
  }
}
```

---

The html tag for your component will match its class name.

> <i><b>Note</b>: Tonic is a thin wrapper around `web components`. Web
> components require a name with two or more parts. So your class name should
> be `CamelCased` (starting with an uppercase letter). For exmaple, `MyGreeting`
> becomes `<my-greeting></my-greeting>`.

---

Next, register your component with `Tonic.add(ClassName)`.

```js
Tonic.add(MyGreeting)
```

---

After adding your Javascript to your HTML, you can use your component anywhere.

```html
<html>
  <head>
    <script src="index.js"></script>
  </head>

  <body>
    <my-greeting></my-greeting>
  </body>
</html>
```

> <i><b>Note</b>: Custom tags (in all browsers) require a closing tag (even if
> they have no children). Tonic doesn't add any "magic" to change how this works.</i>

---

When the component is rendered by the browser, the result of your render
function will be inserted into the component tag.

```html
<html>
  <head>
    <script src="index.js"></script>
  </head>

  <body>
    <my-greeting>
      <div>Hello, World.</div>
    </my-greeting>
  </body>
</html>
```

[0]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
[1]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[2]:https://caniuse.com/#search=domcontentloaded
