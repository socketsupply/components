# 5. Composition

You may want to move the children of a component inside some aditional layout
when the `render()` function is executed. The `this.children` property is helpful
for this. This is not a "special" member of the `props` object like React
(which is unintuitive), it's a member of the class instance.

```js
class Parent extends Tonic {
  render () {
    return `
      <div class="parent">
        <another-component>
          ${this.children}
        </another-component>
      </div>
    `
  }
}

Tonic.add(Parent)

class Child extends Tonic {
  render () {
    return `
      <div class="child">
        ${this.props.value}
      </div>
    `
  }
}

Tonic.add(Child)
```

### Input HTML

```html
<parent>
  <child value="hello world"></child>
</parent>
```

### Output HTML

```html
<parent>
  <div class="parent">
    <another-component>
      <child>
        <div class="child">hello world</div>
      </child>
    </another-component>
  </div>
</parent>
```
