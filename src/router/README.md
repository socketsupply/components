# Router
The `Router` component will render its children components if the browser's current url matches its `path` property. This component will detect `pushstate`, `popstate` and `replacestate` events and re-render with the attributes of the url as props.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-select
      id="tonic-router-select"
      value="/"
      label="Select a URL">
      <option value="/examples.html">/</option>
      <option value="/bar/100">/bar/100</option>
      <option value="/beepboop">/beepboop</option>
    </tonic-select>
    <tonic-router id="page1" path="/examples.html">
      <i>Hello, World</i>
    </tonic-router>
    <tonic-router id="page2" path="/bar/:number">
      <b>number</b> prop has the value <b id="page2-number"></b>.
    </tonic-router>
    <tonic-router none>
      404
    </tonic-router>
  </div>
</div>

## Code

#### HTML

```html
<tonic-router id="page1" path="/examples.html">
  <i>Hello, World</i>
</tonic-router>

<tonic-router id="page2" path="/bar/:number">
  <b>number</b> prop has the value <b id="page2-number"></b>.
</tonic-router>

<tonic-router none>404</tonic-router>
```

#### JS

```js
%js%
```



## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `path` | *string* | A tokenized string to match against the current url, `/books/:book` for example. | |
| `none` | *string* | If specified, and no matches have been made so far, this component will render. | |
| `id` | *string* | If specified, provides a way to reference the component instance and listen for events on it. | |


### Events

| Name | Description |
| :--- | :--- |
| `match` | Emitted when a content section receives the `show` class because it matches the current url. |
