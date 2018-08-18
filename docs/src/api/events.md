# 3. Events

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

Tonic prefers the [event delegation][5] pattern. With event delegation, we
attach a **single event listener** and watch for interactions on the child
elements of a component. With this approach, fewer listeners are created and we
do not need to rebind them when the DOM is re-created.

Each event handler method will receive the plain old Javascript `event` object.
This object contains a `target` property, the exact element that was clicked.
The `path` property is an array of elements containing the exact hierarchy.

Some helpful native DOM APIs for testing properties of an element:
-   [`Element.matches(String)`][6] tests if an element matches a selector
-   [`Element.closest(String)`][7] finds the closest ancestor from the element that
matches the given selector

Tonic also provides a helper function which checks if the element matches the
selector, and if not, tries to find the closest match.

```js
Tonic.matches(el, 'selector')
```

Here, when a particular element inside a child component is clicked, we
intercept the click event and pass along some data to the parent component.

### Example
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

The event object has a [`Event.stopPropagation()`][8] method that is useful for
preventing an event from bubbling up to parent components. You may also be
interested in the [`Event.preventDefault()`][9] method.

[5]:https://davidwalsh.name/event-delegate
[6]:https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
[7]:https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
[8]:https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
[9]:https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
