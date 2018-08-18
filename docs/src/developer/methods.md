# Methods

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
