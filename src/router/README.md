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
    %html%
  </div>
</div>

## Code

#### HTML

```html
%html%
```

#### JS

```js
%js%
```

<style nonce="%nonce%">
  tonic-router.tonic--show {
    display: block;
    margin: 20px 0 6px;
    padding-top: 20px;
    border-top: 1px solid var(--border);
  }
</style>

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
