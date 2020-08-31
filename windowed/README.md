# Windowed
A base class used for creating a windowed component.

If you need to render large data sets (hundreds of thousands of rows for example), you can use a technique known as `windowing`. This technique renders a subset of your data, while giving the user the impression that all the data
has been rendered.

## Demo

This demo generates the data after you click the overlay. Generating 500000 rows of data can take a second or two.

<div class="example">
  <div class="header">Example</div>
  <div class="content windowed-example">
    <example-windowed id="windowed" row-height=30>
    </example-windowed>
  </div>
</div>

## Code

#### HTML

```html
<example-windowed row-height=30>
</example-windowed>
```

#### JS

```js
%js%
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `row-height` | *Number* | Sets the height of each row. <span class="req">required</span> | `30` |
| `rows-page-page` | *Number* | The total number of rows per page to render. | `100` |
| `height` | *String* | Sets the height of the outer container. | `inherit` |
| `theme` | *String* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |
| `debug` | *Boolean* | Add alternating page colors. | `false` |

### Instance Methods

| Method | Description |
| :--- | :--- |
| `load(Array)` | Loads an array of data. |
| `loaded()` | Called after the load function has been called. |
| `getRows()` | Returns an array of all rows that are currently loaded. |
| `getRow(Number)` | Get a row of data (returns an awaitable promise). |

### Instance Methods For Implementers
| Method | Description |
| :--- | :--- |
| `render()` | Render the component, calling `super.render()` will render the row container structure. |
| `renderEmptyState()` | If implemented, should return a structure that represents a state where there are no rows. |
| `renderLoadingState()` | If implemented, should return a structure that represents a state where has not yet completed. |
