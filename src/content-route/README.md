# ContentRoute
The `ContentRoute` component will render its children components if the
browser's current url matches its `path` property. This component will detect
`pushstate`, `popstate` and `replacestate` events and re-render with the
attributes of the url as props.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <input-select
      id="content-route-select"
      value="/"
      style="display: inline-block;"
      label="Select a URL">
      <option value="/">/</option>
      <option value="/bar/100">/bar/100</option>
      <option value="/beepboop">/beepboop</option>
    </input-select>
    <input-button id="content-route-button">Set Route</input-button>
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

<style>
  content-route {
    display: block;
  }

  content-route.show {
    margin: 20px 0;
    padding-top: 30px;
    border-top: 1px solid var(--border);
  }
</style>

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `path` | *string* | A tokenized string to match against the current url, `/books/:book` for example. | |
| `none` | *string* | If specified, and no matches have been made so far, this component will render. | |
