# ContentTooltip

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
        <content-tooltip id="hello">Hover me!</content-tooltip>
      </td>
      <td>Default content box</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
  </tbody>
</table>

<template for="hello">
  <link href="index.css" rel="stylesheet">
  <h3>Hello, World</h3>
  <p>For over five thousand years ginseng has been used as a natural tonic: stimulant, restorative, refresher, cordial; Medicine analeptic, roborant; informal pick-me-up, bracer, livener.</p>
</template>

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute |  |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
