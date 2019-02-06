# 3. Methods

A method is a function of a component. It can help to organize the internal
logic of a component.

All component methods are private by default. No one else can access them. But
in some cases you want to provide public access to a method.

The [constructor][0] is a special method that is called once each time an
instance of your component is created. Here you can add a method to the root
element of your component that calls a method from the component.

```js
class MyComponent extends Tonic {
  constructor (node) {
    super(node)

    this.root.myMethod = n => this.myMethod(n)
  }

  myMethod (n) {
    this.root.innerHTML = `The number is ${n}`
  }
}
```

After the component is created, the `exampleMethod` method can be called.

```js
document.getElementById('foo').myMethod(42)
```

[0]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
