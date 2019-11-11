# 1. Getting Started

Building a component with Tonic starts by creating a [Javascript Class][0].
The class should have at least one method named *render* which usually returns
a string of HTML.

```js
class MyGreeting extends Tonic {
  //
  // The render function can return a template-literal of HTML,
  // it can also include other components.
  //
  render () {
    return `<div>Hello, World.</div>`
  }
}
```

---

The name of your class will determine the html tag name for your component. A
Camel cased class names will create hyphenated tag names, ie `MyGreeting` will
become `<my-greeting></my-greeting>`. Web components require that you have two
part names.

---

Next, register your component with `Tonic.add(ClassName)`.

```js
Tonic.add(MyGreeting)
```

---

After adding your Javascript to your HTML, you can start to use your component.

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

> <i><b>Note</b>: Unrelated to Tonic, custom tags (in all browsers) require a
> closing tag (even if they have no children).</i>

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
