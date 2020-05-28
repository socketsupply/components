# Migration from v9 to v10

We made a breaking change to `tonic-chart`. Previously it had
an optional dependency on `chart.js`

Now you need to set the dependency manually like

```html
<tonic-chart
  type="horizontalBar""
  chart-library="${require('chart.js')}"
  src="/chartdata.json"
></tonic-chart>
```

Or

```js
const chart = document.querySelector('tonic-chart')
chart.setChart(require('chart.js'))
```

If you do not use `tonic-chart` then the upgrade is safe.

# Migration from v8 to v9

`@optoolco/components` now depends on `@optoolco/tonic@12`

You need to upgrade tonic to use v9 of components

# Migration from v7 to v8

`@optoolco/components` now depends on `@optoolco/tonic@11`

You need to upgrade tonic to use v8 of components
