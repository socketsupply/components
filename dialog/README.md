# Dialog

All dialogs have different use cases. Anything could go inside them. So this
class tries to accomodate a wide range of use cases by being the minimum of
what is needed to start with.

> *__Note:__ This component requires the `tonic-sprite` component.*

## Demo
<tonic-dialog
  id="example-dialog"
  width="350px"
  height="260px">
  <show-random
    id="show-random">
  </show-random>
</tonic-dialog>

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-button
      id="example-dialog-link">
      Click To Open
    </tonic-button>
  </div>
</div>

## Code

#### HTML
```html
<example-dialog>
  <my-component>
  </my-component>
</example-dialog>
```

#### JS
```js
const { Dialog } = require('@optoolco/components/dialog')

class TonicDialog extends Dialog {
  willConnect () {
    this.state.message = this.props.message
  }

  click (e) {
    if (!Tonic.match(e.target, '#update')) return

    this.state.message = `Date stamp ${Date.now()}`

    this.reRender()
  }

  render () {
    return this.html`
      <header>Dialog</header>
      <main>
        ${this.state.message}
      </main>
      <footer>
        <tonic-button id="update">Update</tonic-button>
      </footer>
    `
  }
}

Tonic.add(TonicDialog)

const link = document.getElementById('example-dialog-link')
const dialog = document.getElementById('example-dialog')

link.addEventListener('click', e => dialog.show())
```

#### CSS

Example styles that a project might set up outside the component's css.

```css
.tonic--dialog {
  display: grid;
  grid-template-rows: 44px 1fr 80px;
}

.tonic--dialog > header {
  user-select: none;
  line-height 44px;
  text-align center;
  color var(--tonic-medium);
  display block;
}

.tonic--dialog > main {
  padding 0 30px 10px;
  position relative;
  text-align center;
}

.tonic--dialog > footer {
  user-select: none;
  text-align center;
  background-color var(--tonic-window);
  padding 16px;
  text-align center;
  width 100%;
  display block;
}
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute. |  |
| `width` | *string* | Sets the width of the dialog. |  |
| `height` | *string* | Sets the height of the dialog. |  |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the dialog. Returns a promise that can be awaited while the animation finishes. |
| `hide()` | Hides the dialog. Returns a promise that can be awaited while the animation finishes. |
