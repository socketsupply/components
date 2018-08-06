# Custom Components

## Getting Started

Building a component starts with creating a [Javascript Class][0]. The class
should have at least one method named *render* which usually returns a string
of html.

```js
class Greeting extends Tonic {
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
html tag for it.

How you name your class will determine the tag name of your component. The name
For example, a class named `MyGreeting` will become `<my-greeting></my-greeting>`,
and a class named `Greeting` will become `<greeting></greeting>`.

```js
Tonic.add(Greeting)
```

Then, add your Javascript to your html and now you can now use your new
component anywhere in your html. The browser may do weird things if you don't
use a closing tag.

```html
<html>
  <head>
    <script src="index.js"></script>
  </head>

  <body>
    <greeting></greeting>
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
    <greeting>
      <div>Hello, World.</div>
    </greeting>
  </body>
</html>
```

## Registering Components

You must register your components before they can be used. Your first component
should generally be added after the DOM is ready.

```js
Tonic.add(Greeting)
```

## Embedding Style Sheets

You can add styles to your component that won't affect the rest of the page.


```js
class Example extends Tonic {
  style () {

    //
    // When this component is registered, the css will be prefixed by the name
    // of the tag and then added to a stylesheet in the head of the document.
    //
    return `
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
class Example extends Tonic {
  //
  // You can listen to any dom event that happens in your component
  // by creating a method with the corresponding name. The method will
  // receive the plain old Javascript event object.
  //
  mouseover (e) {
    // ...
  }

  change (e) {
    // ...
  }

  click (e) {
    //
    // Often you'll want to check what element in the component was actually
    // clicked. You can also check the `e.path` attribute to see what was
    // clicked (this is helpful when handling clicks on top of SVGs).
    //
    if (!e.target.matches('.parent')) return

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

## Exposing methods on your component

Sometimes you want to expose a method for other people to use. All your
component's methods are private by default! Here's how to make them accessible.

```js
class ExampleComponent extends Tonic {
  constructor (props) {
    super(props)
    this.root.exampleMethod = (...args) => this.exampleMethod(...args)
  }

  exampleMethod (...args) {
    // ...
  }
}
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

# APIs

## STATIC METHODS

| Method | Description |
| :--- | :--- |
| `add(Class, Object)` | Register a class as a new custom-tag and provide optional options for it. |
| `escape(String)` | Escapes html characters from a string (based on [he][3]). |
| `sanitize(Object)` | Escapes all the strings found in an object literal. |
| `match(Node, Selector)` | Match the given node against a selector or any matching parent of the given node. This is useful when trying to locate a node from the actual node that was interacted with. |

## INSTANCE METHODS

| Method | Description |
| :--- | :--- |
| `emit(String, Object)` | Emit a custom event on the root element of the component. A listener will receive a plain old javascript event object that contains the [`detail`][4] property. |
| `setProps(Object)` | Set the properties of a component instance. Can also take a function which will receive the current props as an argument. |
| `setState(Object)` | Set the state of a component instance. Can also take a function which will receive the current props as an argument. |
| `style()` | Returns a string of css to be inlined with the component. This will be "scoped" so that it does not affect the rest of the page. It will also persist across rerenders to save on parsing costs. |
| `render()` | Returns html to be parsed or a dom node that will overwrite. There is usually no need to call this directly, prefer `componentInstance.setProps({ ... })`. |
| `html\`...\`` | Tidy up an html string (use as a [tagged template][2]). |

## "LIFECYCLE" INSTANCE METHODS

The standard "[reactions][1]" (aka lifecycle methods) are available on every
component (as well as a few others).

| Method | Description |
| :--- | :--- |
| `constructor(props)` | An instance of the element is created or upgraded. Useful for initializing state, settings up event listeners, or creating shadow dom. See the spec for restrictions on what you can do in the constructor. A constructor must call `super(props)`. |
| `willConnect()` | Called prior to the element being inserted into the DOM. Useful for updating configuration, state and preparing for the render. |
| `connected()` | Called every time the element is inserted into the DOM. Useful for running setup code, such as fetching resources or rendering. Generally, you should try to delay work until this time. |
| `disconnected()` | Called every time the element is removed from the DOM. Useful for running clean up code. |
| `updated(oldProps)` | Called after setProps() is called. This method is not called on the initial render. |

## EVENTS
Any method defined on your class that matches a dom method will be called when
the event is fired. 

[1]:https://developers.google.com/web/fundamentals/web-components/customelements
[2]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[3]:https://github.com/mathiasbynens/he
[4]:https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events

