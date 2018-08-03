# SidePanel
The component `SidePanel` create a side panel with overlay (color or transparent).

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
        <side-panel id="side-panel-example-1"></side-panel>
        <a href="#" id="side-panel-link-example-1">Click Me</a>
      </td>
      <td>Default Side Panel (right)</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <side-panel id="side-panel-example-2" position="left"></side-panel>
        <a href="#" id="side-panel-link-example-2">Click Me</a>
      </td>
      <td>Default Side Panel (left)</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
    <tr>
      <td>
        <side-panel id="side-panel-example-3" overlay></side-panel>
        <a href="#" id="side-panel-link-example-3">Click Me</a>
      </td>
      <td>Default Side Panel with overlay (right)</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
  </tbody>
</table>

<template for="side-panel-example-1">
  <header></header>
  <main>
    <p>This is a panel</p>
  </main>
  <footer>
    <button>Cancel</button>
    <button>Confirm</button>
  </footer>
</template>

<template for="side-panel-example-2">
  <header></header>
  <main>
    <p>This is a panel but on the left</p>
  </main>
  <footer>
    <button>Cancel</button>
    <button>Confirm</button>
  </footer>
</template>

<template for="side-panel-example-3">
  <header></header>
  <main>
    <p>This is a panel with an overlay</p>
  </main>
  <footer>
    <button>Cancel</button>
    <button>Confirm</button>
  </footer>
</template>

<script>
  const panelLink1 = document.getElementById('side-panel-link-example-1')
  const panel1 = document.getElementById('side-panel-example-1')
  panelLink1.addEventListener('click', e => panel1.show())

  const panelLink2 = document.getElementById('side-panel-link-example-2')
  const panel2 = document.getElementById('side-panel-example-2')
  panelLink2.addEventListener('click', e => panel2.show())

  const panelLink3 = document.getElementById('side-panel-link-example-3')
  const panel3 = document.getElementById('side-panel-example-3')
  panelLink3.addEventListener('click', e => panel3.show())
</script>

## Code

A template is required. Example template structure for panel content:

```html
  <template for= id>
    <header>
      <!-- Header content goes here -->
    </header>
    <main>
      <!-- Main content goes here -->
    </main>
    <footer>
      <!-- Footer content goes here -->
    </footer>
  </template>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the `id` attribute | |
| `name` | *string* | Adds the `name` attribute | |
| `position` | *string* | Changes the position of the panel | *right* |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
