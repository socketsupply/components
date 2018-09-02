# ChartData
An example component that uses [chart.js][0] `2.7.2`.

<chart-data
  type="horizontalBar"
  width="300px"
  height="150px"
  tooltip="false"
  src="/chartdata.json">
</chart-data>

## Code

#### HTML

```html
<chart-data
  type="horizontalBar"
  width="300"
  height="150px"
  tooltip="false"
  src="/chartdata.json">
</chart-data>
```

#### JS

```js
{
  "labels": ["Foo", "Bar", "Bazz"],
  "datasets": [
    {
      "backgroundColor": ["#c3c3c3", "#f06653", "#8f8f8f"],
      "data": [478, 267, 34]
    }
  ]
}
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `title` | *string* | The title of the chart. | |
| `type` | *string* | The type of the bar chart. | |
| `tooltip` | *bool* | Show or don't show the tooltip. | |
| `width` | *string* | Width of the chart (include the unit, `%`, `px` etc). | |
| `height` | *string* | Height of the chart (include the unit, `%`, `px`, etc). | |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `draw(Object, Object)` | Draws (or re-draws) the chart. The first parameter is the data and the second is options. |

[0]:https://www.chartjs.org/
