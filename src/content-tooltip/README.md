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
        <content-tooltip
          id="content-tooltip-example-1">
          Hover me!
        </content-tooltip>
      </td>
      <td>Default content box</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
  </tbody>
</table>

<template for="content-tooltip-example-1">
  <link href="index.css" rel="stylesheet">
  <h3>Hello, World</h3>
  <p>For over five thousand years ginseng has been used as a natural tonic: stimulant, restorative, refresher, cordial; Medicine analeptic, roborant; informal pick-me-up, bracer, livener.</p>
</template>

## Code

A template is required. Example template structure for tooltip content:

```html
  <template for= id>
    <!-- Tooltip content goes here -->
  </template>
```

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
