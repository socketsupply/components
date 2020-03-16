# Tabs
The `tonic-tabs` and `tonic-tab-panel` components create a tab list that activates sections when clicked on.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-tabs selected="tab-2">
      <tonic-tab
        id="tab-1"
        for="tab-panel-1">One</tonic-tab>
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
    <tonic-tab-panel id="tab-panel-2">
      Content Two
    </tonic-tab-panel>
    <tonic-tab-panel id="tab-panel-3">
      Content Three
    </tonic-tab-panel>
  </div>
</div>

## Code

The tabs are grouped under the `tonic-tabs` component. Each tab should be a
`tonic-tab` element, and is associated to a `tonic-tab-panel` id with the
`for` element.

The selected tab should specified by providing an `id` as the value
for the `selected` attribute on the `tonic-tabs` component.

#### HTML
```html
<tonic-tabs selected="tab-2">

  <tonic-tab
    id="tab-1"
    for="tab-panel-1">
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

#### HTML

```html
<tonic-tab-panel id="tab-panel-1">
  Content One
</tonic-tab-panel>

<tonic-tab-panel id="tab-panel-2">
  Content Two
</tonic-tab-panel>

<tonic-tab-panel id="tab-panel-3">
  Content Three
</tonic-tab-panel>
```

## API

### Properties

*for `tonic-tabs`*

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `selected` | *string* | Adds the `id` attribute. | |

*for `tonic-tab`*

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the `id` attribute. <span class="req">required</span> | |
| `for` | *string* | Adds the `id` attribute. <span class="req">required</span> | |

*for `tonic-tab-panel`*

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the `id` attribute. <span class="req">required</span> | |

### Instance Methods & Members

*for `tonic-tabs`*

| Method | Description |
| :--- | :--- |
| `click()` | Click event. |
| `get value` | Get the currently selected tab. |
| `set selected(String)` | Set the currently selected tab. |

### Events

*for `tonic-tabs`*

`tabvisible` ; event emitted when a tab becomes visible. Contains
`ev.detail.id` for which tab is visible.

`tabhidden` ; event emitted when a tab becomes hidden. Contains
`ev.detail.id` for which tab is hidden.

The `tabvisible` & `tabhidden` events get fired whenever a tab
is changed and get triggered both from click & keyboard events.
