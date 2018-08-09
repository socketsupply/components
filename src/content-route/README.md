# ContentRoute
The `ContentRoute` component will render it's children components if the
browser's current url matches its `path` property. This component will detect
__pushstate__, __popstate__ and __replacestate__ events and rerender with the
attributes of the url.

## Demo

<table class="example">
  <thead>
    <tr>
      <th>Example</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="#" id="content-route-link-2">Back</a><a href="#" id="content-route-link-1">Set</a>
        <content-route path="/foo/:number">
          Content for "/foo/${this.state.number}".
        </content-route>
      </td>
      <td>
        <span id="content-route-example-1">Conditional content based on url</span>
      </td>
    </tr>
  </tbody>
</table>

<style>
  content-route {
    margin-top: 16px;
    border: 1px solid var(--border);
    padding: 4px;
    display: block;
    min-height: 32px;
    color: var(--info);
  }

  #content-route-link-1,
  #content-route-link-2 {
    font-size: 14px;
    font-family: var(--subheader);
    margin-right: 8px;
  }
</style>

%html%

%js%

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `path` | *string* | A tokenized string to match against the current url, `/books/:book` for example. | |
| `none` | *string* | If specified, and no matches have been made so far, this component will render. | |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
