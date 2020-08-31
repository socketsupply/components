# Properties

`Props` are properties that are passed to the component in the form of html
attributes. For example...

```js
class MyApp extends Tonic {
  render () {
    return this.html`
      <my-greeting message="Hello, World">
      </my-greeting>
    `
  }
}
```

---

Properties added to a component appear on the `this.props` object.

---

Tonic has no templating language, it uses HTML! But since HTML only
understands string values, we need some help to pass more complex
values to a component, for that we use `this.html`.

```js
const foo = {
  hi: 'Hello, world',
  bye: 'Goodbye, and thanks for all the fish'
}

class MyApp extends Tonic {
  render () {
    return this.html`
      <my-greeting messages="${foo}">
      </my-greeting>
    `
  }
}
```

```js
class MyGreeting extends Tonic {
  render () {
    return this.html`
      <h1>${this.props.messages.hi}</h1>
    `
  }
}
```

> <i><b>Note</b>: A property named `fooBar='30'` will become lowercased
> (as per the HTML spec). If you want the property name to be camel cased when
> added to the props object, use `foo-bar='30'` to get `this.props.fooBar`.</i>

---

You can use the "spread" operator to expand object literals into html properties.

```js
class MyComponent extends Tonic {
  render () {
    const o = {
      a: 'testing',
      b: 2.2,
      fooBar: 'ok'
    }

    return this.html`
      <some-component ...${o}>
      </some-component>

      <div ...${o}>
      </div>
    `
  }
}
```

The above compoent renders the following output.

```html
<my-component>
  <some-component a="testing" b="2.2" foo-bar="ok">
    <div a="testing" b="2.2" foo-bar="ok">
    </div>
  </some-component>

  <div a="testing" b="2.2" foo-bar="ok">
  </div>
</my-component>
```

### Updating properties

There is no evidence that Virtual DOMs improve performance accross a broad set
of use cases, but it's certain that they greatly increase complexity. Tonic doesn't
use them. Instead, we recommend `incremental updates`. Simply put, you re-render a
component when you think the time is right. The rule of thumb is to only re-render
what is absolutely needed.

---

To manually update a component you can use the `.reRender()` method. This method
receives either an object or a function. For example...

```js
// Update a component's properties
this.reRender(props => ({
  ...props,
  color: 'red'
}))

// Reset a component's properties
this.reRender({ color: 'red' })

// Re-render a component with its existing properties
this.reRender()
```

---

The `.reRender()` method can also be called directly on a component.

```js
document.getElementById('parent').reRender({ data: [1,2,3, ...9999] })
```
