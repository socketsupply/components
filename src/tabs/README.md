# Tabs
The `tonic-tabs` and `tonic-tab-panel` components create a tab list that activates sections when clicked on.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-tabs>
      <tonic-tab
        id="tab-1"
        for="tab-panel-1"
        selected="true">One</tonic-tab>
      <tonic-tab
        id="tab-2"
        for="tab-panel-2">Two</tonic-tab>
      <tonic-tab
        id="tab-3"
        for="tab-panel-3">Three</tonic-tab>
    </tonic-tabs>
    <tonic-tab-panel id="tab-panel-1">
      Content One
    </tonic-tab-panel>
    <tonic-tab-panel id="tab-panel-2" hidden>
      Content Two
    </tonic-tab-panel>
    <tonic-tab-panel id="tab-panel-3" hidden>
      Content Three
    </tonic-tab-panel>
  </div>
</div>

## Code

The tabs are grouped under the `tonic-tabs` component. Each tab should be a `tonic-tab` element, and it is associated to a `tonic-tab-panel` id with the `for` element.

The default selected tab should have the `selected` attribute.

#### HTML
```html
<tonic-tabs>

  <tonic-tab
    id="tab-1"
    for="tab-panel-1"
    selected="true">
    One
  </tonic-tab>

  <tonic-tab
    id="tab-2"
    for="tab-panel-2">
    Two
  </tonic-tab>

  <tonic-tab
    id="tab-3"
    for="tab-panel-3">
    Three
  </tonic-tab>

</tonic-tabs>
```

---

Specify which `tonic-tab-panel` should be showing by marking the other panels as `hidden` by default.

#### HTML
```html
<tonic-tab-panel id="tab-panel-1">
  Content One
</tonic-tab-panel>

<tonic-tab-panel id="tab-panel-2" hidden>
  Content Two
</tonic-tab-panel>

<tonic-tab-panel id="tab-panel-3" hidden>
  Content Three
</tonic-tab-panel>
```

## Api

### Properties

*for `tonic-tab`*

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the `id` attribute. <span class="req">required</span> | |
| `for` | *string* | Adds the `id` attribute. <span class="req">required</span> | |
| `selected` | *boolean* | Adds the `id` attribute. | |

*for `tonic-tab-panel`*

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the `id` attribute. <span class="req">required</span> | |

### Instance Methods & Members

*for `tonic-tab`*

| Method | Description |
| :--- | :--- |
| `click()` | Click event. |
