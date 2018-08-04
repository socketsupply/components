# Custom Components

## Getting Started

Building a component starts with creating a [Javascript Class][0]. The class
should have at least one method named *render* which usually returns a string
of html.

```js
class ExampleComponent extends Tonic {
  //
  // The render function can return a string of html, it can include other
  // components as well. It can also return a dom node, we'll talk about
  // that later.
  //
  render () {
    return `<div>Hello, World.</div>`
  }
}
```

Next, you can tell the browser about your new class and it will create a custom
html tag for it. There is a weird rule about custom tags, they must be two or
more words, `FooBar`, is ok, `Bar` won't work.

```js
Tonic.add(ExampleComponent)
```

Add your Javascript to your html and now you can now use your new component
anywhere in your html.

```html
<html>
  <head>
    <script src="index.js"></script>
  </head>

  <body>
    <example-component></example-component>
  </body>
</html>
```

The result, when rendered by the browser, will be that the html
from your render function will be inserted into the component. As you
can see, the potential complexity of your code will be hidden from the
programmer using it, making their reality a little simpler.

```html
<html>
  <head>
    <script src="index.js"></script>
  </head>

  <body>
    <example-component>
      <div>Hello, World.</div>
    </example-component>
  </body>
</html>
```

## Registering Components

You must register your components before they can be used. If you specify the
"shadow" option, your components will render into a `shadow dom`.

```js
Tonic.add(ComponentA, { shadow: true })
Tonic.add(ComponentB)
```

## Embedding Style Sheets

If you create your component with a `shadow dom`, you can add a stylesheet to
your component that won't affect the rest of the page.

```js
class ExampleComponent extends Tonic {
  constructor () {
    super()

    //
    // You can create a "private" stylesheet that will not affect any
    // other part of the page. Since we are using Web Components,
    // this doesn't require any hacks — hacks that can make debugging
    // much more difficult.
    //
    this.stylesheet = `
      div {
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

## Listening For Events

Tonic helps you capture events that happen when someone interacts with your
component. It also helps you organize that code.

```js
class ExampleComponent extends Tonic {
  //
  // You can listen to any dom event that happens in your component
  // by creating a method with the corresponding name. The method will
  // receive the plain old Javascript event object.
  //
  mouseover (e, target) {
    // ...
  }

  //
  // Events that do not normally propagate from the shadow DOM to the standard
  // DOM will still call your event methods.
  //
  change (e, target) {
    // ...
  }

  click (e, target) {
    //
    // Often you'll want to check what element in the component was actually
    // clicked. The target attribute will always return the actual element
    // that was clicked, regardless of what part of the dom it originated.
    //
    if (!target.matches('.parent')) return

    // ...
  }

  render () {
    return `<div></div>`
  }
}
```

## Passing data and arguments

Add components to your html, pass them arguments just like with regular html.

```js
<my-component value="7a">
</my-component>
```

Native HTML only understands strings. If you want to pass non-string props, like
some json, you need to first stringify it. The "data" attribute is special and
will automatically be parsed into json for you. Don't forget single quotes!

```html
<parent-component id="parent" data='${JSON.stringify(data)}'>
</parent-component>
```

Alternatively, you can call the `setProps(...)` method on the element directly.

```js
document.getElementById('parent').setProps(data)
```

## Pre-Renderng and optimizing for performance

```
class AnotherThing extends Tonic {
  constructor () {
    super()

    //
    // If you have lots of structure, but only a few
    // changes, you could prerender your layout to create
    // a reusable node and pass it to the render method.
    // This structure could also come from a <template>
    // tag which would also improve performance.
    //
    this.template = document.createElement('div')
  }

  willConnect () {
    //
    // Set state on a component instance or on this instance,
    // .setProps() will cause a downward cascade of re-rendering.
    // Set props can also accept a function that will provide
    // the current props as an argument.
    //
    this.setProps({ value: this.getRandomValue() })
  }

  connected () {
    //
    // Target and update a few nodes directly.
    //
  }

  //
  // Render will automatically deep-clone this node for you.
  //
  render () {
    return this.template
  }
}
```

More details on [Github][1]

[0]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
[1]:https://github.com/hxoht/tonic

