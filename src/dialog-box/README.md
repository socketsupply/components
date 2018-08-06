# DialogBox
The component `DialogBox` is used to create a dialog that displays content on top of an overlay.

## Demo

<table class="example">
  <thead>
    <tr>
      <th>Example</th>
      <th>Description</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <dialog-box id="dialog-box-example-1"></dialog-box>
        <input-button name="buttonCancel" id="dialog-box-link-example-1" value="Click to open"></input-button>
      </td>
      <td>Default dialog box</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <dialog-box id="dialog-box-example-2" overlay="false"></dialog-box>
        <input-button name="buttonCancel" id="dialog-box-link-example-2" value="Click to open"></input-button>
      </td>
      <td>Dialog box without overlay (also resets its content).</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <dialog-box id="dialog-box-example-3" overlay="true" background-color="rgba(75, 145, 221, 0.5)"></dialog-box>
        <input-button name="buttonCancel" id="dialog-box-link-example-3" value="Click to open"></input-button>
      </td>
      <td>Dialog box with overlay and custom background color</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
  </tbody>
</table>

<template for="dialog-box-example-1">
  <header>Dialog</header>
  <main>
    <p>I'm a little dialog,<br> hear me shout</p>
  </main>
  <footer>
    <input-button value="cancel"></input-button>
    <input-button value="confirm"></input-button>
  </footer>
</template>

<template for="dialog-box-example-2">
  <header>Dialog</header>
  <main>
    <p>${data.message || 'Hello, world'}</p>
  </main>
  <footer>
    <input-button value="cancel"></input-button>
    <input-button value="confirm"></input-button>
  </footer>
</template>

<template for="dialog-box-example-3">
  <header>Dialog</header>
  <main>
    <p>I'm a little dialog,<br> hear me shout</p>
  </main>
  <footer>
    <input-button value="cancel"></input-button>
    <input-button value="confirm"></input-button>
  </footer>
</template>

<script>
  const dialogLink1 = document.getElementById('dialog-box-link-example-1')
  const dialog1 = document.getElementById('dialog-box-example-1')
  dialogLink1.addEventListener('click', e => dialog1.show())

  const dialogLink2 = document.getElementById('dialog-box-link-example-2')
  const dialog2 = document.getElementById('dialog-box-example-2')
  
  let clickCount = 1
  dialogLink2.addEventListener('click', e => {
    dialog2.setProps(props => ({
     ...props,
      message: `Clicked ${clickCount++} times.`
    }))
    dialog2.show()
  })

  const dialogLink3 = document.getElementById('dialog-box-link-example-3')
  const dialog3 = document.getElementById('dialog-box-example-3')
  dialogLink3.addEventListener('click', e => dialog3.show())
</script>

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute |  |
| `name` | *string* | Adds a `name` attribute |  |
| `width` | *string* | Sets the width of the dialog |  |
| `height` | *string* | Sets the height of the dialog |  |
| `overlay` | *string* | Adds a background overlay | `true` |
| `backgroundColor` | *string* | Sets the background color of the overlay | `rgba(0,0,0,0.5)` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
