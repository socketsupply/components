# Methods

A method is a function of a component. It can help to organize the internal
logic of a component.

The [constructor][0] is a special method that is called once each time an
instance of your component is created.

```js
class MyComponent extends Tonic {
  constructor () {
    super()
    // ...
  }

  myMethod (n) {
    this.innerHTML = `The number is ${n}`
  }
}
```

After the component is created, the method `myMethod` method can be called.

```js
document.getElementById('foo').myMethod(42)
```

[0]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
