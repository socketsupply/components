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
        <content-tooltip theme="dark" id="hello">Hover me!</content-tooltip>
      </td>
      <td>Default content box</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
  </tbody>
</table>

<template for="hello">
  <h1>Hello</h1>
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