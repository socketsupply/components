# 1. Styling

Components should ship with as little CSS as possible and try to inherit
whenever possible from the document's stylesheets.

Although you want to let the user's style-sheet to handle as much of the styling
as possibke, sometimes your styles have more of a functional purpose than a
visual one. In cases like this you should prefix the classes name so it doesn't
collide with any class names that the user has defined. We use this convention...

```js
library--componentname--class
```

Your styles will be applied to the elements in your component that match the
specified selectors after the `render` method is executed. The style function
retuns an objct where each key is a selector and each value is an object of
style rules.

```js
class MyGreeting extends Tonic {
  style () {
    return {

      'div' {
        display: 'inline-block',
        border: '1px dotted #666'
        height: '100px',
        width: '100px',
        line-height: '90px'
      },

      `.tonic--mygreeting--error`: {
        color: 'red'
      }
    }
  }

  render () {
    return `<div></div>`
  }
}
```
