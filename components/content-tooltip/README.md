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
      <td><content-tooltip id="hello">Hello, World</content-tooltip></td>
      <td>Default content box</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
  </tbody>
</table>

<style>
  .tooltip {
    background: blue;
  }
</style>

<template for="hello">
  <h1>Hello</h1>
</template>
