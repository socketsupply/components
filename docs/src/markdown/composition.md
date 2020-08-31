# Composition

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
