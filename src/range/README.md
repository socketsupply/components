# Range

The `Range` component creates a range input, or slider.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-range
      label="The value is %i%"
      value="80"
      id="tonic-range-example">
    </tonic-range>
  </div>
</div>

## Code

#### HTML

```html
<tonic-range
  label="The value is %i%"
  id="tonic-range-example">
</tonic-range>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Input with `id` attribute. <span class="req">Required</span> | |
| `name` | *string* | Input with `name` attribute. | |
| `disabled` | *boolean* | Makes the input `disabled`. | `false` |
| `width` | *string* | Width of the track. | `250px` |
| `height` | *string* | Height of the track. | `4px` |
| `radius` | *string* | Radius of the track. | `3px` |
| `min` | *string* | Least possible value. | `0` |
| `max` | *string* | Greatest possible value. | `100` |
| `step` | *string* | Number the value must adhere to. | `1` |
| `label` | *string* | Label that displays the current value. Use %i, %f, etc to represent the value. | `false` |
| `thumbColor` | *string* | Color of the slider "thumb" | `var(--window)` |
| `thumbRadius` | *string* | Radius of the slider "thumb" | `50px` |
| `value` | *string* | Default value | `50` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Members

| Property | Description |
| :--- | :--- |
| `value` | Get the current value of the range input. |
