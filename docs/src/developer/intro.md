# Intro

Building a component with Tonic starts with creating a [Javascript Class][0].
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

How you name your class will determine the tag name of your component. For
example, a class named `Greeting` will become `<greeting></greeting>`. Camel
case tag names will be hyphenated.

---

Next, you need to tell the browser about your new class and it will create a
custom HTML tag for it. Your top most component should generally be added after
the [DOM is ready][2].

```js
Tonic.add(MyGreeting)
```

---

After adding your Javascript to your HTML, you can start to use your component
tags. And remember, all custom tags require a closing tag.

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

When the HTML is rendered by the browser, the result of your render function
will be inserted into the component. As you can see — the potential complexity
of your code will be hidden from the programmer using it, making their reality a
little simpler.

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
