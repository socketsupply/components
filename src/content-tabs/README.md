# ContentTabs
The component `ContentTabs` creates a menu that activates sections when clicked on.

## Demo

<table class="example">
  <thead>
    <tr>
      <th>Example</th>
      <th>Description &amp; Code</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <content-tabs group="profile">
          <span data-tab-name="one" class="selected">One</span>
          <span data-tab-name="two">Two</span>
          <span data-tab-name="three">Three</span>
        </content-tabs>
        <section data-tab-group="profile" data-tab-name="one" class="show">
          Content One
        </section>
        <section data-tab-group="profile" data-tab-name="two">
          Content Two
        </section>
        <section data-tab-group="profile" data-tab-name="three">
          Content Three
        </section>
      </td>
      <td>
        <span id="content-tabs-tooltip-1">Default Tab Menu</span>
      </td>
    </tr>
  </tbody>
</table>

%html%

## Code

In order to link each tab to the section that will be displayed, pass `group` to the `content-tabs` component with the name of the group, i.e. "profile". Within the component, each tab and each section must contain a corresponding `data-tab-name`.

The default tab should have the class `selected` to start.

```html
<content-tabs group="profile">
  <span data-tab-name="one" class="selected">One</span>
  <span data-tab-name="two">Two</span>
  <span data-tab-name="three">Three</span>
</content-tabs>
```

Each section must contain the `data-tab-name` corresponding to its tab and the attribute `data-tab-group` corresponding to the tabs `group`, i.e. "profile".

The default section should have the class `show` to start.

```html
<section data-tab-group="profile" data-tab-name="one" class="show">
  Content One
</section>

<section data-tab-group="profile" data-tab-name="two">
  Content Two
</section>

<section data-tab-group="profile" data-tab-name="three">
  Content Three
</section>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the `id` attribute | |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
