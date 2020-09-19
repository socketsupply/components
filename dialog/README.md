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
  <tonic-button id="example-dialog-link">Open</tonic-button>
</div>

## Code

#### HTML
```html
<button id="open-dialog">Open Dialog</button>

<tonic-dialog id="example-dialog">
  <show-random>
  </show-random>
</tonic-dialog>
```

#### JS
```js
class ShowRandom extends Tonic {
  async click (e) {
    if (Tonic.match(e.target, '#update')) {
      this.state.message = String(Math.random())
      this.reRender()
    }
  }

  render () {
    return this.html`
      <header>Dialog</header>

      <main>
        ${this.state.message || 'Ready'}
      </main>

      <footer>
        <tonic-button id="update">Update</tonic-button>
      </footer>
    `
  }
}

Tonic.add(ShowRandom)

const link = document.getElementById('open-dialog')
const dialog = document.getElementById('example-dialog')

link.addEventListener('click', async e => dialog.show())
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
