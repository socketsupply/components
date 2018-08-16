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
        <section data-tab-group="profile" data-tab-name="one">
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

In order to link each tab to the section that will be displayed, pass `group` to
the `content-tabs` component with the name of the group, i.e. "profile". Within
the component, each tab and each section must contain a corresponding
`data-tab-name`.

The default tab should have the class `selected`. The structure inside the
`content-tabs` component cab be whatever you want, spans, links, links inside
divs, they can all be different, it doesn't matter as long as you use the
`data-tab-name` property.

```html
<content-tabs group="profile">
  <span data-tab-name="one" class="selected">One</span>
  <span data-tab-name="two">Two</span>
  <span data-tab-name="three">Three</span>
</content-tabs>
```

Each section must contain the `data-tab-name` corresponding to its tab and the attribute `data-tab-group` corresponding to the tabs `group`, i.e. "profile".

```html
<section data-tab-group="profile" data-tab-name="one">
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

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `click()` | Click event |
