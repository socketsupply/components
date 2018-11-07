# 1. Getting Started

Building a component with Tonic starts by creating a [Javascript Class][0].
The class should have at least one method named *render* which usually returns
a string of HTML.

```js
class MyGreeting extends Tonic {
  //
  // The render function can return a template-literal of HTML, it can include
  // other components as well. It can also return a dom node, we'll talk about
  // that later.
  //
  render () {
    return `<div>Hello, World.</div>`
  }
}
```

---

The name of your class will determine the html tag name for your component. A
class named `Greeting` will become `<greeting></greeting>`. Camel cased class
names will create hyphenated tag names, ie `MyGreeting` will become
`<my-greeting></my-greeting>`.

---

Next, you need to tell the browser about your new class and it will create a
custom HTML tag for it. Your top most component should generally be added after
the [DOM is ready][2]. Now any time the component's tag appears in your html, an
instance of your class will be created.

```js
Tonic.add(MyGreeting)
```

---

After adding your Javascript to your HTML, you can start to use your component.
And remember, all custom tags require a closing tag.

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

---

The potential for components is that the complexity of a solution can be
hidden for the programmer who uses it. They can then focus more on the value
it produces and the properties they want to pass it.


[0]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
[1]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[2]:https://caniuse.com/#search=domcontentloaded