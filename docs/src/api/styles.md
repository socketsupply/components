# 1. Styling

Components should ship with as little CSS as possible and try to inherit
whenever possible from the document's stylesheets.

Although you want to let the user's style-sheet style the component as much as
possible. Sometimes your styles will have a *functional* purpose. For these
cases you should prefix the classes name so it doesn't collide with any class
names that the user has defined. We use the following convention...

```js
library--componentname--class
```

Your component's styles will be applied to the elements that match the specified
selectors after the `render` method is executed. The style function retuns an
objct where each key is a selector and each value is an object of style rules.

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

      '.tonic--mygreeting--error': {
        color: 'red'
      }
    }
  }

  render () {
    return `<div></div>`
  }
}
```
