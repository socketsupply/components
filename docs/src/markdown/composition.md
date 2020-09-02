# Composition

### Nesting

With `Tonic` you can nest templates from other functions or methods.

```js
class MyPage {
  renderHeader () {
    return this.html`<h1>Header</h1>`
  }
  render () {
    return this.html`
      ${this.renderHeader()}
      <main>My page</main>
    `
  }
}
```

This means you can break up your `render() {}` method into multiple
methods or re-usable functions.

### Conditionals

If you want to do conditional rendering you can use if statements.

```js
const LoginPage {
  render () {
    let message = 'Please Log in'
    if (this.props.user) {
      message = this.html`<div>Welcome ${this.props.user.name}</div>`
    }

    return this.html`<div class="message">${message}</div>`
  }
}
```

### Children

Once you add components, they can be nested any way you want. The
property `this.children` will get this component's child elements
so that you can read, mutate or wrap them.

```js
class ParentComponent extends Tonic {
  render () {
    return this.html`
      <div class="parent">
        <another-component>
          ${this.children}
        </another-component>
      </div>
    `
  }
}

Tonic.add(ParentComponent)

class ChildComponent extends Tonic {
  render () {
    return this.html`
      <div class="child">
        ${this.props.value}
      </div>
    `
  }
}

Tonic.add(ChildComponent)
```

### Input HTML

```html
<parent-component>
  <child-component value="hello world"></child-component>
</parent-component>
```

### Output HTML

```html
<parent-component>
  <div class="parent">
    <another-component>
      <child-component>
        <div class="child">hello world</div>
      </child-component>
    </another-component>
  </div>
</parent-component>
```

### Repeating templates

You can embed an array of template results using `this.html`

```js
class TodoList extends Tonic {
  render () {
    const todos = this.state.todos

    const lis = []
    for (const todo of todos) {
      lis.push(this.html`<li>${todo.value}</li>`)
    }

    return this.html`<ul>${lis}</ul>`
  }
}
```

By using an array of template results, tonic will render your
repeating templates for you.
