# Performance

If you have lots of structure, but only a few changes, you could pre-render your
layout to create a reusable node and pass it to the render method. This
structure could also come from a `<template>` tag which my also improve
performance.

```
class AnotherThing extends Tonic {
  constructor (node) {
    super(node)

    const template = document.createElement('template')
    template.appendChild(document.createElement('span'))  

    this.template = template.content
  }

  //
  // Render will automatically deep-clone this node for you.
  //
  render () {
    return this.template
  }
}
```
