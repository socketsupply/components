# Custom Components

### Building a Component

Building a component starts with creating a [Javascript Class][0]. The class
should have at least one method named *render* which usually returns a string
of HTML.

```js
class MyGreeting extends Tonic {
  //
  // The render function can return a string of HTML, it can include other
  // components as well. It can also return a dom node, we'll talk about
  // that later.
  //
  render () {
    return `<div>Hello, World.</div>`
  }
}
```

How you name your class will determine the tag name of your component. For example, a class named `Greeting` will become `<greeting></greeting>`. Camel case tag names will be hyphenated.

---

Next, you can tell the browser about your new class and it will create a custom HTML tag for it.

```js
Tonic.add(MyGreeting)
```

---

After adding Javascript to your HTML, you can now use your new component anywhere in your HTML. Make sure to use a closing tag for browser consistency.

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

When the HTML is rendered by the browser, the result of your render function will be inserted into the component. As you can see — the potential complexity of your code
will be hidden from the programmer using it, making their reality a little simpler.

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

### Registering Components

You must register your components before they can be used. Your first component
should generally be added after the [DOM is ready][00].

```js
Tonic.add(MyGreeting)
```

### Embedding Style Sheets

Any styles returned from your component will be attached to a style element in
the head.

It is important to prefix your styles with the name of the component to ensure the proper scope. Otherwise, the styles may apply to other parts of the page where the component is used.

```js
class MyGreeting extends Tonic {
  style () {
    return `
      my-greeting div {
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

### Listening For Events

Tonic helps you capture events that happen when someone interacts with your
component. It also helps you organize that code.

```js
class Example extends Tonic {
  //
  // You can listen to any DOM event that happens in your component
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
    // You may want to check which element in the component was actually
    // clicked. You can also check the `e.path` attribute to see what was
    // clicked (helpful when handling clicks on top of SVGs).
    //
    if (!e.target.matches('.parent')) return

    // ...
  }

  render () {
    return `<div></div>`
  }
}
```

The convention of most frameworks is to attach individual event listeners,
such as `onClick={myHandler()}` or `click=myHandler`. In the case where
you have a table with 2000 rows, this would create 2000 individual listeners.

With [event delegation][5], we can attach a **single event listener** and watch
for interactions on the child elements of a component. With this approach, fewer
listeners are created and we do not need to rebind them when the DOM is
re-created.

Each event handler method will receive the plain old Javascript `event` object.
This object contains a `target` property, the exact element that was clicked.
The `path` property is an array of elements containing the exact hierarchy.

Some helpful native DOM APIs for testing properties of an element:
-   [`Element.matches()`][6] tests if an element matches a selector
-   [`Element.closest`][7] finds the closest ancestor from the element that matches
the given selector

Tonic also provides a helper function which checks if the element matches the selector,
and if not, tries to find the closest match.

```js
Tonic.matches(el, 'selector')
```

Here, when a particular element inside a child component is clicked, we
intercept the click event and pass along some data to the parent component.

#### Example
```js
class Child extends Tonic {
  click (e) {
    e.detail.bar = true
  }
  render () {
    return `<div class="foo">Click Me</div>`
  }
}

class Parent extends Tonic {
  click (e) {
    if (e.target.matches('.foo')) {
      console.log(e.detail.bar)
    }
  }
  render () {
    return `<child></child>`
  }
}
```

The event object has a [`.stopPropagation()`][8] method that is useful for
preventing an event from bubbling up to parent components. You may also be
interested in the [`.preventDefault()`][9] method.

### Passing data and arguments

Add components to your HTML, pass them arguments just like with regular HTML.

```js
<my-component value="7a"></my-component>
```

Native HTML only understands strings. If you want to pass non-string props (like
some json) you need to stringify it. If you surround your property value with
curly braces `{...}`, the value will be parsed as JSON. But you should not
pass complex objects like functions though your HTML. Keep that in your JS!

```html
<parent-component id="parent" data={[1,2,3]}></parent-component>
```

Alternatively, you can call the `reRender(...)` method on the element directly.
This is a better way to pass data if you have larger data it wont need to first
pass though the HTML.

```js
document.getElementById('parent').reRender({ data: [1,2,3, ...9999] })
```

### State and Props

`.reRender()` and `.setState()` can receive either an object or a function as an
argument. For example...

```js
//
// Update a component's properties
//
myComponent.reRender(props => ({
  ...props,
  color: 'red'
}))
```

```js
//
// Reset a component's properties
//
myComponent.reRender({ color: 'red' })
```

```js
//
// Re-render a component with its existing properties
//
myComponent.reRender()
```

The value received by `.reRender()` should represent the properties of the
component (those properties should generally be considered immutable and
provided by the top-most parent component).

`.setState()` receives a value that describes the state of the component, under
the hood this is a plain old javascript object. It's values may be used by the
component's render function.

`.setState()` will not cause a re-render. The reasoning behind this is that
`state` can be updated independently, as needed and rendering happens only when
changes to the representation of the component are required.

### Composing Components

You may want to move the children of a component inside some aditional layout
when the render() function is executed. The `this.children` property is helpful
for this. This is not a "special" member of the `props` object like React
(which is unintuitive), it's a member of the class instance.

```js
class Parent extends Tonic {
  render () {
    return `
      <div class="parent">
        <another-component>
          ${this.children}
        </another-component>
      </div>
    `
  }
}

Tonic.add(Parent)

class Child extends Tonic {
  render () {
    return `
      <div class="child">
        ${this.props.value}
      </div>
    `
  }
}

Tonic.add(Child)
```

#### Input HTML

```html
<parent>
  <child value="hello world"></child>
</parent>
```

#### Output HTML

```html
<parent>
  <div class="parent">
    <another-component>
      <child>
        <div class="child">hello world</div>
      </child>
    </another-component>
  </div>
</parent>
```

### Exposing methods on your component

Sometimes you want to expose a method for other people to use. All your
component's methods are private by default! Here's how to make them accessible.

```js
class ExampleComponent extends Tonic {
  constructor (props) {
    super(props)
    this.root.exampleMethod = () => this.exampleMethod()
  }

  exampleMethod () {
    // ...
  }
}
```

### Pre-Rendering and optimizing for performance

```
class AnotherThing extends Tonic {
  constructor (props) {
    super(props)

    //
    // If you have lots of structure, but only a few
<<<<<<< HEAD
    // changes, you could preRender your layout to create
=======
    // changes, you could pre-render your layout to create
>>>>>>> wip custom docs
    // a reusable node and pass it to the render method.
    // This structure could also come from a <template>
    // tag which would also improve performance.
    //
    const template = document.createElement('template')
    template.appendChild(document.createElement('span'))  

    this.template = template.content
  }

  willConnect () {
    //
    // Set state on a component instance or on this instance,
    // .reRender() will cause a downward cascade of re-rendering.
    // Set props can also accept a function that will provide
    // the current props as an argument.
    //
    this.reRender({ value: 'foo' })
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
| `escape(String)` | Escapes HTML characters from a string (based on [he][3]). |
| `sanitize(Object)` | Escapes all the strings found in an object literal. |
| `match(Node, Selector)` | Match the given node against a selector or any matching parent of the given node. This is useful when trying to locate a node from the actual node that was interacted with. |

## INSTANCE METHODS

| Method | Description |
| :--- | :--- |
| `emit(String, Object)` | Emit a custom event on the root element of the component. A listener will receive a plain old javascript event object that contains the [`detail`][4] property. |
<<<<<<< HEAD
| `reRender(Object | Function)` | Set the properties of a component instance. Can also take a function which will receive the current props as an argument. |
| `getProps()` | Get the properties of a component instance. |
| `setState(Object | Function)` | Set the state of a component instance. Can also take a function which will receive the current props as an argument. |
| `style()` | Returns a string of css to be inlined with the component. This will be "scoped" so that it does not affect the rest of the page. It will also persist across re-renders to save on parsing costs. |
| `render()` | Returns html to be parsed or a dom node that will overwrite. There is usually no need to call this directly, prefer `componentInstance.reRender({ ... })`. |
| html\`...\` | Tidy up an html string (use as a [tagged template][2]). |
=======
| <code>reRender(Object &#124; Function)</code> | Set the properties of a component instance. Can also take a function which will receive the current props as an argument. |
| `getProps()` | Get the properties of a component instance. |
| <code>setState(Object &#124; Function)</code> | Set the state of a component instance. Can also take a function which will receive the current props as an argument. |
| `style()` | Returns a string of css to be inlined with the component. This will be "scoped" so that it does not affect the rest of the page. It will also persist across re-renders to save on parsing costs. |
| `render()` | Returns HTML to be parsed or a dom node that will overwrite. There is usually no need to call this directly, prefer `componentInstance.reRender({ ... })`. |
| html\`...\` | Tidy up an HTML string (use as a [tagged template][2]). |
>>>>>>> wip custom docs

## "LIFECYCLE" INSTANCE METHODS

The standard "[reactions][1]" (aka lifecycle methods) are available on every
component, as well as a few other methods.

| Method | Description |
| :--- | :--- |
| `constructor(props)` | An instance of the element is created or upgraded. Useful for initializing state, setting up event listeners, or creating shadow dom. See the spec for restrictions on what you can do in the constructor. A constructor will receive an argument of `props` and must call `super(props)`. |
| `willConnect()` | Called prior to the element being inserted into the DOM. Useful for updating configuration, state and preparing for the render. |
| `connected()` | Called every time the element is inserted into the DOM. Useful for running setup code, such as fetching resources or rendering. Generally, you should try to delay work until this time. |
| `disconnected()` | Called every time the element is removed from the DOM. Useful for running clean up code. |
| `updated(oldProps)` | Called after reRender() is called. This method is not called on the initial render. |

[0]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
[00]:https://caniuse.com/#search=domcontentloaded
[1]:https://developers.google.com/web/fundamentals/web-components/customelements
[2]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[3]:https://github.com/mathiasbynens/he
[4]:https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
[5]:https://davidwalsh.name/event-delegate
[6]:https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
[7]:https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
[8]:https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
[9]:https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
