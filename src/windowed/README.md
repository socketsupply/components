# Windowed
A base class used for creating a windowed component.

If you need to render large data sets (hundreds of thousands of rows for
example), you can use a technique known as `windowing`. This technique renders
a subset of your data, while giving the user the impression that all the data
has been rendered.

## Demo

In this demo we add 500000 items to an array and load them into the list.

<style>
  body > main div.example .content.windowed-example {
    max-width: initial;
    padding: 0;
    position: relative;
  }
 
  my-windowed {
    height: 300px;
  }

  my-windowed .th {
    background: var(--border);
  }

  my-windowed .th,
  my-windowed .tr {
    height: 30px;
    display: flex;
    overflow: hidden;
    border-bottom: 1px solid var(--border);
  }

  my-windowed .tr:hover {
    background: var(--accent);
    color: white;
    cursor: default;
  }

  my-windowed .td {
    white-space: nowrap;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100px;
    font-family: var(--monospace);
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    flex-basis: 33.3%;
    padding: 0 4px;
  }

  #click-to-load {
    position: absolute;
    display: flex;
    left: 0;
    right: 0;
    background: white;
    z-index: 1;
    top: 0;
    bottom: 0;
    cursor: pointer;
    opacity: 1;
    transition: all 1.5s;
  }

  #click-to-load span {
    margin: auto;
  }

  #click-to-load.hidden {
    opacity: 0;
    z-index: -1;
  }
</style>

<div class="example">
  <div class="header">Example</div>
  <div class="content windowed-example">
    <div id="click-to-load">
      <span>Click to Load</span>
    </div>
    <my-windowed row-height={30}>
    </my-windowed>
  </div>
</div>

## Code

#### HTML

```html
<my-windowed row-height={30}>
</my-windowed>
```

#### JS

```js
%js%
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `row-height` | *Number* | Sets the height of each row. <span class="req">required</soan> | `30` |
| `rows-page-page` | *Number* | The total number of rows per page to render. | `100` |
| `height` | *String* | Sets the height of the outer container. | `inherit` |
| `theme` | *String* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |
| `debug` | *Boolean* | Add alternating page colors. | `false` |

### Instance Methods

| Method | Description |
| :--- | :--- |
| `load(Array)` | Loads an array of data. |

