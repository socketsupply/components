# ContentTooltip

The `ContentTooltip` component creates a dynamically positioned pop-up tooltip filled with custom content that shows during the `hover` state of the corresponding trigger element.

## Demo

<table class="example">
  <thead>
    <tr>
      <th>Example</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <span id="content-tooltip-example-1">Hover over this text</span>
      </td>
      <td>
        <span id="content-tooltip-tooltip-1">
          Default content box. Hover here for another example.
        </span>
      </td>
    </tr>
  </tbody>
</table>

%html%

<content-tooltip for="content-tooltip-tooltip-1" width="515px">

<span class="code-type">Html</span>

```html
<span id="content-tooltip-example-1">Hover me!</span>

<content-tooltip for="content-tooltip-example-1">
  <!-- HTML Content -->
</content-tooltip>
```

</content-tooltip>

<style>
  #content-tooltip-example-1 {
    cursor: default;
  }
</style>

## Code

The element that will be used to trigger the display of the tooltip must
contain an `id` that matches the `for` attribute on the `content-tooltip`
element.

```html
%html%
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `for` | *string* | Adds a `for` attribute <span class="req">required</span> |  |
| `width` | *string* | Changes the `width` style |  |
| `height` | *string* | Changes `height` style |  |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the tooltip |
| `hide()` | Hides the tooltip |
