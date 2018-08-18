# Methods

If you want to expose a method on your component for other people to use, you
can do thate from the constructor. All your component's methods are private by
default. Here's how to make them public.

```js
class ExampleComponent extends Tonic {
  constructor (node) {
    super(node)

    this.root.exampleMethod = (n) => this.exampleMethod(n)
  }

  exampleMethod (n) {
    this.value = n
  }

  get value () {
    return this.value
  }
}
```
