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

Tabs have two imporant concepts. The idea of a `group` and the idea of a `name`.
Each tab in a tab group will have content that is associated by a `name`.

The structure inside the `content-tabs` component can be arbitrary, spans,
links, links inside divs, they can all be different, it doesn't matter as long
as you add the `data-tab-name` property to the thing that will be clicked.

The default tab should have the class `selected`.

```html
<content-tabs group="profile">
  <span data-tab-name="one" class="selected">One</span>
  <span data-tab-name="two">Two</span>
  <div class="special-tab">
    <img src="/three.png" data-tab-name="three"/>
  </div>
</content-tabs>
```

You can use any tag for the content (`section` is a nice one to use), and the
tag containing the content can be located anywhere in your document.

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
