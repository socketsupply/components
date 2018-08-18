# Performance

If you have lots of structure, but only a few changes, you could pre-render your
layout to create a reusable node and pass it to the render method. This
structure could also come from a `<template>` tag which could also improve
performance.

```
class AnotherThing extends Tonic {
  constructor (props) {
    super(props)
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
